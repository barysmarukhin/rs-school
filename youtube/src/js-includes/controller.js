import * as model from './model';
import * as view from './view';
import router from './router';
import _ from 'lodash';

export default {
  videoSearhRoute: (...args) => {
    const results = document.getElementById('results');
    return model.getVideos(...args)
    .then((response) => {
      const items = response.items;
      results.innerHTML = view.render('video', items);
      router.handle('pagination', items.length, ...args)
    });
  },
  paginationRoute: (itemsCount,...args) => {
    const results = document.getElementById('results');
    let dataTooltip;
    const pagination = {
      code: '',
      //utility
      extend: (data) => {
        data = data || {};
        pagination.itemsCount = data.itemsCount;
        pagination.pageWidth = pagination.getPageWidth();
        pagination.itemsPerPage = Math.round(pagination.pageWidth / 426,6667);
        pagination.size = Math.ceil(pagination.itemsCount / pagination.itemsPerPage) || 300;
        pagination.resultsWidth = pagination.size * pagination.pageWidth;
        pagination.setResultsWidth(pagination.resultsWidth);
        pagination.page = data.page || 1;
        pagination.moveItems(pagination.page);
        pagination.step = data.step || 2;
      },
      add: (s, f) => {
        pagination.code += view.render('paginationAdd', {
          'firstItem': s,
          'lastItem': f
        });
      },
      last: () => {
        pagination.code += view.render('paginationLast', {
          'lastItem': pagination.size
        });
      },
      first: () => {
        pagination.code += view.render('paginationFirst', {
          'firstItem': 1
        });
      },
      moveItems: (page) => {
        const translateValue = (pagination.pageWidth * (page-1)).toString();
        document.getElementById('results').style.transform = `translateX(-${translateValue}px)`;
      },
      getPageWidth: () => {
        return document.getElementsByClassName('container')[0].offsetWidth;
      },
      setResultsWidth: (width) => {
        document.getElementById('results').style.width = width + 'px';
      },
      getMoreItems: () => {
        model.getVideos(...args)
        .then((response) => {
          const items = response.items;
          results.innerHTML += view.render('video', items);
          pagination.extend({
            itemsCount: pagination.itemsCount + items.length,
            page: pagination.page,
            step: pagination.step
          });
          pagination.start();
        });
      },
      //handlers
      click: function() {
        pagination.page = +this.innerHTML;
        pagination.moveItems(pagination.page);
        pagination.start();
      },
      mousedown: function() {
        this.className += ' mousedowned';
      },
      mousemove: function() {
        if(this.classList.contains('mousedowned')){
          this.classList.remove('mousedowned');
        }
      },
      onResize: () => {
        window.addEventListener('resize', () => {
          pagination.extend({
            itemsCount: pagination.itemsCount,
            page: pagination.page,
            step: pagination.step
          });
          pagination.start();
          //if after resize would be the less pages than it was
          if(pagination.page > pagination.size) {
            pagination.page = pagination.size
          }
          pagination.moveItems(pagination.page);
        }, false)
      },
      onSwipe: () => {
        let xDown = null;
        let xUp = null;
        let yDown = null;
        let yUp = null;
        pagination.onTouchSwipe(xDown, xUp, yDown, yUp);
        pagination.onMouseSwipe(xDown, xUp);
      },
      onTouchSwipe: (xDown, xUp, yDown, yUp) => {
        results.addEventListener('touchstart', (e) => {
          xDown = e.touches[0].clientX;
          yDown = e.touches[0].clientY;
        });
        results.addEventListener('touchmove', (e) => {
          if (!xDown || !yDown) {
            return;
          }
          xUp = e.touches[0].clientX;
          yUp = e.touches[0].clientY;
        });
        results.addEventListener('touchend', () => {
          if (!xDown || !xUp || !yDown || !yUp) {
            return;
          }
          const xDiff = xDown - xUp;
          const yDiff = yDown - yUp;
          if( Math.abs(xDiff) < Math.abs(yDiff)) {
            return //if swipe will occur at vertical axis mostly
          }
          if (xDiff > 0) {
            pagination.next();//left swipe
          } else {
            pagination.prev();//right swipe
          }
        });
      },
      onMouseSwipe: (xDown, xUp) => {
        results.addEventListener('mousedown', (e) => {
          xDown = e.clientX;
        });
        results.addEventListener('mousemove', (e) => {
          if (!xDown) {
            return;
          }
          xUp = e.clientX;
        });
        results.addEventListener('mouseup', () => {
          if (!xDown || !xUp) {
            return;
          }
          const xDiff = xDown - xUp;
          if (xDiff > 0) {
            pagination.next();
          } else {
            pagination.prev();
          }
        });
      },
      stopImageDrag: () => {
        /* тут лучше было навесить один обработчик на общий родительский элемент и использовать всплытие событий */
        _.forEach(document.getElementsByClassName('youtube-item__img'), (image) => {
          image.ondragstart = () => false;
        });
      },
      prev: () => {
        pagination.page--;
        if(pagination.page < 1) {
          pagination.page = 1;
        }
        pagination.moveItems(pagination.page);
        pagination.start();
      },
      next: () => {
        pagination.page++;
        if (pagination.page > pagination.size) {
          pagination.getMoreItems();
        } else {
          pagination.moveItems(pagination.page);
          pagination.start();
        }
      },
      //script
      bind: () => {
        const a = pagination.e.getElementsByClassName('pagination__item');
        for(let i = 0; i < a.length; i++) {
          if (+a[i].innerHTML === pagination.page) {
            a[i].className += ' current';
          }
          a[i].addEventListener('click', pagination.click, false);
          a[i].addEventListener('mousedown', pagination.mousedown, false);
          a[i].addEventListener('mousemove', pagination.mousemove, false);
        }
      },
      finish: () => {
        pagination.e.innerHTML = pagination.code;
        pagination.code = '';
        pagination.bind();
      },
      start: () => {
        pagination.stopImageDrag();
        if (pagination.size < pagination.step * 2 + 6) {
            pagination.add(1, pagination.size + 1);
        }
        else if (pagination.page < pagination.step * 2 + 1) {
            pagination.add(1, pagination.step * 2 + 4);
            pagination.last();
        }
        else if (pagination.page > pagination.size - pagination.step * 2) {
            pagination.first();
            pagination.add(pagination.size - pagination.step * 2 - 2, pagination.size + 1);
        }
        else {
            pagination.first();
            pagination.add(pagination.page - pagination.step, pagination.page + pagination.step + 1);
            pagination.last();
        }
        pagination.finish();
      },
      //initialization
      buttons: () => {
        const nav = document.getElementsByClassName('pagination__nav');
        nav[0].addEventListener('click', pagination.prev, false);
        nav[1].addEventListener('click', pagination.next, false);
      },
      create: (e) => {
        e.innerHTML = view.render('pagination');
        pagination.e = document.getElementsByClassName('pagination__items')[0];
        pagination.buttons(e);
        pagination.onResize();
        pagination.onSwipe();
      },
      init: (e, data) => {
        pagination.extend(data);
        pagination.create(e);
        pagination.start();
      }
    }
    return pagination.init(document.getElementById('pagination'), {
      itemsCount,
      page:1,
      step:2
    })
  }
}

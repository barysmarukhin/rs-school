import * as model from './model';
import * as view from './view';
import router from './router';

export default {
  videoSearhRoute: (...args) => {
    return model.getVideos(...args)
    .then((response) => {
      const items = response.items;
      results.innerHTML = view.render('video', items);
      router.handle('pagination', items.length, ...args)
    });
  },
  paginationRoute: (itemsCount,...args) => {
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
        pagination.step = data.step || 2;
      },
      add: (s, f) => {
        for (var i = s; i < f; i++) {
            pagination.code += '<a class="pagination__item">' + i + '</a>';
        }
      },
      last: () => {
        pagination.code += '<i>...</i><a class="pagination__item">' + pagination.size + '</a>';
      },
      first: () => {
        pagination.code += '<a class="pagination__item">1</a><i>...</i>';
      },
      moveItems: (page) => {
        const translate = (pagination.pageWidth * (page-1)).toString();
        document.getElementById('results').style.transform = `translateX(-${translate}px)`;
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
          pagination.moveItems(pagination.page);
          pagination.start();
        });
      },
      //handlers
      click: function() {
        pagination.page = +this.innerHTML;
        pagination.moveItems(pagination.page);
        pagination.start();
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
        }
      },
      finish: () => {
        pagination.e.innerHTML = pagination.code;
        pagination.code = '';
        pagination.bind();
      },
      start: () => {
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

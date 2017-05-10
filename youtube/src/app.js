import css  from './app.scss';
import * as view from './js-includes/view';
import router from './js-includes/router';

document.body.innerHTML = view.render('markup', '')
const submitForm = document.getElementById('submitForm');
const searchField = document.getElementById('searchField');
const initialData = {
  itemsCount: 12,
  apiCode: 'AIzaSyALXrws-rL-ikZzepdzE1Y4sWfHxnCH1Vg'
}
submitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  router.handle('videoSearh',searchField.value, initialData.itemsCount, initialData.apiCode);
});

// window.addEventListener('resize', () => {
//   //if pagination initialized
//   if (document.getElementById('pagination').hasChildNodes()) {
//     router.handle('pagination',initialData.itemsCount);
//   }
// }, false);

// window.addEventListener('resize', () => {console.log('resized')}, false)

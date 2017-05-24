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

/* вот этот листенер было бы здорово во view перенести, а initialData передать через параметр функции view.render() */
submitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  router.handle('videoSearh',searchField.value, initialData.itemsCount, initialData.apiCode);
});

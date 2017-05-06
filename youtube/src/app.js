import css  from './app.scss';
import * as view from './js-includes/view';
import router from './js-includes/router';

document.body.innerHTML = view.render('markup', '')
const submitForm = document.getElementById('submitForm');
const searchField = document.getElementById('searchField');
const initialData = {
  resultCount: 15,
  apiCode: 'AIzaSyALXrws-rL-ikZzepdzE1Y4sWfHxnCH1Vg'
}
submitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  router.handle('videoSearh',searchField.value, initialData.resultCount, initialData.apiCode);
});

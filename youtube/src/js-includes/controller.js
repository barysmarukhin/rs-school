import * as model from './model';
import * as view from './view';

const resultsWrapper = document.getElementById('resultsWrapper');

export default {
  videoSearhRoute: (...args) => {
    return model.getVideos(...args)
    .then((response) => {
      resultsWrapper.innerHTML = view.render('video', response.items)
    });
  }
}

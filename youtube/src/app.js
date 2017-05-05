import css  from './app.scss';
import * as Model from './js-includes/model';
import * as View from './js-includes/view';
// import router from 'js-includes/router';
// import view from 'js-includes/view';
// import controller from 'js-includes/controller';


document.body.innerHTML =
'<header>' +
  '<form id="submitForm" action="#">' +
    '<p><input type="text" class="form-control" id="searchField" placeholder="type something"></p>' +
    '<p><input type="submit" value="search" class="form-control" id="submitButton"></p>' +
  '</form>' +
'</header>' +
'<div id="resultsWrapper"></div>';
const submitForm = document.getElementById('submitForm');
const searchField = document.getElementById('searchField');
const initialData = {
  resultCount: 15,
  apiCode: 'AIzaSyALXrws-rL-ikZzepdzE1Y4sWfHxnCH1Vg'
}
submitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  Model.getVideos(searchField.value, initialData.resultCount, initialData.apiCode)
  .then((response) => {
    resultsWrapper.innerHTML = View.render('video', response.items)
  });
});

function onSearchResponse(response) {
  showResponse(response);
}

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
  var responseString = JSON.stringify(response, '', 2);
  document.getElementById('response').innerHTML += responseString;
}

// <script type="text/template" id="videoTemplate">
// <div class="youtube-item">
//   <span class="title"><%-title%></span>
//   <span class="description"><%-description%></span>
// </div>
// </script>

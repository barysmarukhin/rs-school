import css  from './app.scss';
import _ from 'lodash';

window.onload = onClientLoad;
const submitForm = document.getElementById('submitForm');
const searchField = document.getElementById('searchField');

submitForm.addEventListener('submit', search)

function search(e) {
  e.preventDefault();
  const searchValue = searchField.value;
  const request = gapi.client.youtube.search.list({
    part: 'snippet',
    type: 'video',
    q: encodeURIComponent(searchValue.replace(/%20/g,'+')),
    maxResults: 3,
    order: 'viewCount',
    publishedAfter: "2015-01-01T00:00:00Z"
  });
  request.execute(onSearchResponse);
}

function onSearchResponse(response) {
  showResponse(response);
}

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
  var responseString = JSON.stringify(response, '', 2);
  document.getElementById('response').innerHTML += responseString;
}
function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyALXrws-rL-ikZzepdzE1Y4sWfHxnCH1Vg');
}

//loash learning
const array = [1,2,4,12,43,1,44,2345];

console.log('dropWhile()', _.dropWhile(array, function(item) {
  return item < 10;
}));
console.log('hello', _.fill(array, 'hello'));

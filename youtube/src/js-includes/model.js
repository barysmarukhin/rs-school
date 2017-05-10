export const getVideos = (searchValue = null, itemsCount = null, apiCode = null) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let request = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchValue}`;
    if(window.nextPageToken) {
      request = `${request}&pageToken=${window.nextPageToken}`;
    }
    request = `${request}&type=video&order=viewCount&maxResults=${itemsCount}&key=${apiCode}`;
    xhr.open('GET', request, true);
    xhr.onload = function(){
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
        if (response.items.length === 0) {
          alert('Not found results');
          return;
        }
        window.nextPageToken = response.nextPageToken;
        resolve(response);
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    }
    xhr.send(null);
  })
}

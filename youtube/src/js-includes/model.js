export const getVideos = (searchValue, itemsCount, apiCode) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let request = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchValue}`;
    request = `${request}&type=video&order=viewCount&maxResults=${itemsCount}&key=${apiCode}`;
    xhr.open('GET', request, true);
    xhr.onload = function(){
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
        if (response.items.length === 0) {
          alert('Not found results');
          return;
        }
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

import axios from 'axios';
import dompurify from 'dompurify';

function searchResultsHTML(events) {
  return events.map(event => {
    return`
      <a href="/administrator/event/${event.slug}" class="search__result">
        <strong>${event.name}</strong>
      </a>
    `;
  }).join('');
}

function typeAhead (search){
  if(!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  searchInput.on('input', function() {
    if (!this.value){
      searchResults.style.display = 'none';
      return;
    }

    searchResults.style.display = 'block';

    axios
      .get(`/administrator/api/search?q=${this.value}`)
      .then(res => {
        if(res.data.length) {
          searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data))
          return;
        }
        searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">No results for ${this.value}</div>`)
      })
      .catch(err => {
        console.error(err);
      });
  });

  searchInput.on('keyup', (e) => {
    //git they aren't pressing up, down or enter, who cares!
    if(![38, 40, 13].includes(e.keyCode)){
      return
    }
    const activeClass = 'search__result--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search__result');
    let next;
    if (e.keyCode === 40 && current) {
      next = current.nextElementSibling || items[0];
    } else if (e.keyCode === 40) {
      next = items[0];
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1];
    } else if (e.keyCode === 38) {
      next = items[items.length - 1];
    } else if (e.keyCode === 13 && current.href) {
      window.location = current.href;
      return
    }
    if(current) {
      current.classList.remove(activeClass);
    }
    next.classList.add(activeClass);
  });
}

export default typeAhead;

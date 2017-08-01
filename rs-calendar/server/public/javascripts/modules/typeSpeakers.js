import axios from 'axios';
import dompurify from 'dompurify';

function clear(element) {
  element.style.display = 'none';
  element.innerHTML = '';
}

function searchResultsHTML(speakers) {
  return speakers.map(speaker => {
    return`
      <div class="search-speakers__result">
        <strong class="search-speakers__result-text">${speaker.name}</strong>
        <span class="search-speakers__result-id">${speaker._id}</span>
      </div>
    `;
  }).join('');
}

function typeSpeakers (search){
  if(!search) return;
  const searchInput = search.querySelector('.search-speakers__input');
  const searchResults = search.querySelector('.search-speakers__results');

  searchInput.on('input', function() {
    if (!this.value){
      searchResults.style.display = 'none';
      return;
    }

    searchResults.style.display = 'block';
    axios
      .get(`/administrator/api/search-speakers?q=${this.value}`)
      .then(res => {
        if(res.data.length) {
          searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data))
          return;
        }
        searchResults.innerHTML = dompurify.sanitize(`<div class="search-speakers__result"><span class="search-speakers__result-text">No results for ${this.value}</span></div>`)
      })
      .catch(err => {
        console.error(err);
      });
  });

  searchResults.on('click', function(e) {
    searchInput.value = e.target.innerText;
    const searchInputHidden = this.parentNode.querySelector('.search-speakers__input-hidden');
    searchInputHidden.value = e.target.parentNode.querySelector('.search-speakers__result-id').innerText;
    clear(searchResults);
  })

  searchInput.on('keydown', (e) => {
    //git they aren't pressing up, down or enter, who cares!
    if(![38, 40, 13].includes(e.keyCode)){
      return
    }
    const activeClass = 'search-speakers__result--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search-speakers__result');
    let next;
    if (e.keyCode === 40 && current) {
      next = current.nextElementSibling || items[0];
    } else if (e.keyCode === 40) {
      next = items[0];
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1];
    } else if (e.keyCode === 38) {
      next = items[items.length - 1];
    } else if (e.keyCode === 13 && current) {
      e.preventDefault();
      searchInput.value = current.innerText;
      clear(searchResults);
      return;
    }
    if(current) {
      current.classList.remove(activeClass);
    }
    next.classList.add(activeClass);
  });
}

export default typeSpeakers;

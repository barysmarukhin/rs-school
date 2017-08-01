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

function typeSpeakers (search, addButton){
  if(!search) return;

  addButton.on('click', function(){
    const labels = search.querySelector('.search-speakers__labels');
    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', 'search-speaker');
    newLabel.setAttribute('class', 'search-speakers__container');
    const newSpeakerHTML = '<span class="search-speakers__remove">x</span><input id="search-speaker" type="text" autocomplete="off" type="text" placeholder="Search speaker..." class="search-speakers__input"><div class="search-speakers__results"></div><input type="hidden" name="speakers" class="search-speakers__input-hidden">';
    newLabel.innerHTML = newSpeakerHTML;
    labels.appendChild(newLabel);
    // labels.innerHTML += newSpeakerField;
  });
  search.on('input', function(e) {
    const currentSearchInput = e.target;
    const currentSearchResults = currentSearchInput.parentNode.querySelector('.search-speakers__results');
    if (!currentSearchInput.value){
      currentSearchResults.style.display = 'none';
      return;
    }
    currentSearchResults.style.display = 'block';
    axios
      .get(`/administrator/api/search-speakers?q=${currentSearchInput.value}`)
      .then(res => {
        if(res.data.length) {
          currentSearchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data))
          return;
        }
        currentSearchResults.innerHTML = dompurify.sanitize(`<div class="search-speakers__result"><span class="search-speakers__result-text">No results for ${currentSearchInput.value}</span></div>`)
      })
      .catch(err => {
        console.error(err);
      });
  });

  search.on('click', function(e) {
    if(e.target.classList.contains('search-speakers__result-text')) {
      const currentSearchText = e.target;//register the click on single speaker came from ajax
      const currentSearchResult = currentSearchText.parentNode;
      const currentSearchResults = currentSearchResult.parentNode;
      const currentSearchContainer = currentSearchResults.parentNode;
      const currentSearchInput = currentSearchContainer.querySelector('.search-speakers__input')
      const searchInputHidden = currentSearchContainer.querySelector('.search-speakers__input-hidden');
      currentSearchInput.value = currentSearchText.innerText;
      searchInputHidden.value = currentSearchResult.querySelector('.search-speakers__result-id').innerText;
      clear(currentSearchResults);
    } else if(e.target.classList.contains('search-speakers__remove')){
      const currentRemoveButton = e.target;
      const currentSpeakerField = currentRemoveButton.parentNode;
      currentSpeakerField.remove();
    }
  })

  search.on('keydown', (e) => {
    if(![38, 40, 13].includes(e.keyCode)){ //if they aren't pressing up, down or enter, who cares!
      return
    }
    const activeClass = 'search-speakers__result--active';
    const currentSearchInput = e.target;
    const currentSeachContainer = currentSearchInput.parentNode;
    const currentSearchResults = currentSeachContainer.querySelector('.search-speakers__results');
    const current = currentSearchResults.querySelector(`.${activeClass}`);
    const items = currentSearchResults.querySelectorAll('.search-speakers__result');
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
      currentSearchInput.value = current.querySelector('.search-speakers__result-text').innerText;
      clear(currentSearchResults);
      return;
    }
    if(current) {
      current.classList.remove(activeClass);
    }
    next.classList.add(activeClass);
  });
}

export default typeSpeakers;

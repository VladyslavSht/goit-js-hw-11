import Notiflix from 'notiflix';

const refs = {
    submitBtn: document.querySelector('button'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}


let page = 1;
let pageSize = 40;
refs.loadMoreBtn.classList.add('is-hidden');



refs.submitBtn.addEventListener('click', handleSearch);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);

function handleLoadMore(){
    page +=1;

    fetchPictures(refs.input.value).then(fetchResponse);
}

function handleSearch(e) {
    e.preventDefault();

    const inputValue = refs.input.value;
    page = 1;

    if(inputValue === "") {
        return;
    }

    clearMarkUp();

    fetchPictures(inputValue).then(fetchResponse);
    
}

async function fetchPictures(name) {
    const url = 'https://pixabay.com/api/';

    return await fetch(`${url}?key=26995225-4fa3fe4f15fe1635ebf8d0ee7&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${pageSize}`)
  .then(response => {
    if (!response.ok) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
      throw new Error(response.status);
    }
    return response.json();
  });
}

async function fetchResponse(pictures) {
  if(pictures.totalHits === 0) {

      refs.loadMoreBtn.classList.add('is-hidden');
            
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.'); 
      return;
    }
  refs.loadMoreBtn.classList.remove('is-hidden');
   
  const pictureList = await pictures.hits.map(picture => {

    return `<div class="photo-card">
        <img src='${picture.webformatURL}' alt="${Object.values(picture.tags)}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${picture.likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${picture.views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${picture.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${picture.downloads}</b>
          </p>
        </div>
      </div>`;
    }).join("");
  
  
      insertList(pictureList);

  }

  function insertList(pictureList) {
    refs.gallery.insertAdjacentHTML('beforeend', pictureList);
  }

  function clearMarkUp() {
      refs.gallery.innerHTML = "";
  }
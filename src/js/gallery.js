import Notiflix from 'notiflix';

const refs = {
    submitBtn: document.querySelector('button'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
}


refs.submitBtn.addEventListener('click', handleSearch);

function handleSearch(e) {
    e.preventDefault();
    
    const inputValue = refs.input.value;

    if(inputValue === "") {
        return;
    }
    fetchPictures(inputValue).then(fetchResponse);
}

function fetchPictures(name) {
    const url = 'https://pixabay.com/api/';

    return fetch(`${url}?key=26995225-4fa3fe4f15fe1635ebf8d0ee7&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchResponse(pictures) {

    const pictureList = pictures.hits.map(picture => {
        if(pictures.hits === []) {
            console.log("kjfhjk");
            Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        }
        return `<div class="photo-card">
        <img src='${picture.webformatURL}' alt="${Object.values(picture.tags)}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${picture.likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${picture.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${picture.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${picture.downloads}</b>
          </p>
        </div>
      </div>`;
    }).join("");
  
  
      insertList(pictureList);

  }

  function insertList(pictureList) {
    refs.gallery.insertAdjacentHTML('beforeend', pictureList);
  }
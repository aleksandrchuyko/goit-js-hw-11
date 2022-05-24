import './sass/main.scss';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {fetchPhotos} from "./js/fetchPhotos.js";

const refs = {
    searchForm: document.querySelector('#search-form'),
    queryInput: document.querySelector('input[name="searchQuery"]'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}

const params = {
    key: '27605426-0fda2c4b0cfa268906a19ec96',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 40
};

let totalHits = 0;

function clearGallery() {
    refs.gallery.innerHTML = "";
    params.page = 1;
    totalHits = 0;
    refs.loadMoreBtn.classList.add('is-hidden');
    
}

function renderGallery(photosArr) {
    const cards = photosArr.reduce((acc, card) => {
        return acc += `<div class="photo-card">
        <img src="" alt="${card.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes</b>${card.likes}
            </p>
            <p class="info-item">
            <b>Views</b>${card.views}
            </p>
            <p class="info-item">
            <b>Comments</b>${card.comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>${card.downloads}
            </p>
        </div>
        </div>`;
    }, "");

    refs.gallery.insertAdjacentHTML("beforeend", cards);
    if (params.page * params.per_page < totalHits) {
        refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
        refs.loadMoreBtn.classList.add('is-hidden');
    }
    
    if ((params.page * params.per_page >= totalHits) && (params.page > 1)) {
        Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
    }

    // const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
    // window.scrollBy({
    //     top: cardHeight * 2,
    //     behavior: "smooth",
    // });
}

clearGallery();

refs.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearGallery();
    
    const searchQuery = e.currentTarget.elements["searchQuery"].value.trim();
    params.q = searchQuery;

    fetchPhotos(params).then(response => {
        totalHits = response.data.totalHits;
        if (totalHits) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            renderGallery(response.data.hits);
        }
        else {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
    });
});

refs.loadMoreBtn.addEventListener('click', (e) => {
    params.page += 1;
    fetchPhotos(params).then(response => { renderGallery(response.data.hits) });
});

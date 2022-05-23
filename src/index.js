import './sass/main.scss';

import {fetchPhotos} from "./js/fetchPhotos.js";

const refs = {
    searchForm: document.querySelector('#search-form'),
    queryInput: document.querySelector('input[name="searchQuery"]'),
    loadMoreBtn: document.querySelector('.load-more')
}

let params = {
    key: '27605426-0fda2c4b0cfa268906a19ec96',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
};

refs.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    params.q = e.currentTarget.elements["searchQuery"].value;
    fetchPhotos(params);
});

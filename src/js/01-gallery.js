// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryContainter = document.querySelector('.gallery');
const listItemsMarkup = createListItemsMarkup(galleryItems);

function createListItemsMarkup(items) {
  return items.map(item => `<a class="gallery__item" href="${item. preview}">
  <img class="gallery__image" src="${item.original}" alt="${item.description}" />
</a>`)
      .join('');
}

galleryContainter.innerHTML = listItemsMarkup;


new SimpleLightbox('.gallery a', {
   captionsData: 'alt',
    aptionDelay: 250,
});

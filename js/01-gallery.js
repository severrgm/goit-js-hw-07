import { galleryItems } from "./gallery-items.js";
// Change code below this line

const divGalleryRef = document.querySelector(".gallery");

function createGalleryImages(array) {
  return array
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
                <a class="gallery__link" href="${original}">
                  <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                  />
                </a>
              </div>`;
    })
    .join("");
}

const createMarkup = createGalleryImages(galleryItems);

divGalleryRef.insertAdjacentHTML("beforeend", createMarkup);

let instance;

function onImageZoomClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="800" height="600">`
  );

  instance.show();
  document.addEventListener("keydown", onModalCloseEscapePress);
}

function onModalCloseEscapePress(event) {
  const pressKey = event.code;

  if (pressKey !== "Escape") {
    document.removeEventListener("keydown", onModalCloseEscapePress);
    return;
  }

  instance.close();
  document.removeEventListener("keydown", onModalCloseEscapePress);
}

divGalleryRef.addEventListener("click", onImageZoomClick);

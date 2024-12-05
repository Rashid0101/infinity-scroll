const imageContainer = document.getElementById('image-container');
const loaderEl = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArr = [];
let initialLoad = true;

//  Unsplash API
let count = 5;
const apiKey = '_GGuzwLU83EazXpcfrqQu0sQdBVdVE4c8ZfeWg3QrvU';
let apiUrl = `https://api.unsplash.com/photos/random/
?client_id=${apiKey}&count=${count}`;

//  check if all images were loaded

function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/
?client_id=${apiKey}&count=${count}`;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArr.length;

  // Run function for each object in photosArray
  photosArr.forEach(photo => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');

    setAttribute(item, {
      href: photo.links.html,
      target: '_blank',
    });
    //  Create <img> for photo
    const img = document.createElement('img');

    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArr = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

//  Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load

getPhotos();

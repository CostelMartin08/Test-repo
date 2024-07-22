import 'swiper/css';
import 'swiper/css/bundle';
import Swiper from 'swiper/bundle';

import {
  createTitleAndPercent,
  createAvailability,
  createPrice,
  createAbout,
  createCheckout,
  createDetails,
  createSpan,

} from './js/elements';

import { createCart, cartView } from "./js/cart";

import './style.css'


function Box(product) {

  const container = document.createElement('div');
  container.id = 'app';
  container.className = 'container';


  function createSectionFirst(product) {
    const section = document.createElement('section');
    section.className = 'child first';

    const img = document.createElement('img');
    img.className = 'img';
    img.src = product.image;
    img.alt = product.name;

    section.appendChild(img);
    return section;
  }

  function createSectionSecond(product) {

    const section = document.createElement('section');
    section.className = 'child second';

    const cartViewContainer = cartView();
    const cart = createCart();

    const titleandPercent = createTitleAndPercent(product);
    const availability = createAvailability();
    const price = createPrice(product);
    const about = createAbout();
    const checkout = createCheckout(product);
    const details = createDetails();

    section.appendChild(cartViewContainer);
    section.appendChild(cart);
    section.appendChild(titleandPercent);
    section.appendChild(availability);
    section.appendChild(price);
    section.appendChild(about);
    section.appendChild(checkout);
    section.appendChild(createSpan('*Στην τιμή συμπεριλαμβάνεται ο ΦΠΑ 24%', 'font-light'));
    section.appendChild(document.createElement('hr'));
    section.appendChild(details);

    return section;
  }

  container.appendChild(createSectionFirst(product));
  container.appendChild(createSectionSecond(product));

  return container;
}


function createSwiper(containerSelector, products) {

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'swiper';


  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';


  products.forEach(product => {
    const swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide';

    const containerBox = Box(product);

    swiperSlide.appendChild(containerBox);


    swiperWrapper.appendChild(swiperSlide);
  });


  swiperContainer.appendChild(swiperWrapper);

  const pagination = document.createElement('div');
  pagination.className = 'swiper-pagination';
  swiperContainer.appendChild(pagination);

  const buttonPrev = document.createElement('div');
  buttonPrev.className = 'swiper-button-prev';
  swiperContainer.appendChild(buttonPrev);

  const buttonNext = document.createElement('div');
  buttonNext.className = 'swiper-button-next';
  swiperContainer.appendChild(buttonNext);

  const scrollbar = document.createElement('div');
  scrollbar.className = 'swiper-scrollbar';
  swiperContainer.appendChild(scrollbar);

  const container = document.querySelector(containerSelector);
  container.innerHTML = '';
  container.appendChild(swiperContainer);

  //Config. carusel Swiper
  const swiper = new Swiper('.swiper', {
    centeredSlides: true,
    spaceBetween: 20,
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    effect: 'coverflow',
    fadeEffect: {
      crossFade: true
    },
    speed: 800,
  });

  return swiper;
}

//Preluare date JSON
document.addEventListener('DOMContentLoaded', () => {
  const dataUrl = '/mock-data.json';

  fetch(dataUrl)
    .then(response => response.json())
    .then(products => {

      createSwiper('#app', products);
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
});



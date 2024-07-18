import 'swiper/css';
import 'swiper/css/bundle';
import Swiper from 'swiper/bundle';
import data from './mock-data.json';

import './style.css'


document.querySelector('#app').innerHTML = `
  
  <div class="swiper">

    <div class="swiper-wrapper">
     
      <div class="swiper-slide">${data[0].name}</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      <div class="swiper-slide">Slide 4</div>
      <div class="swiper-slide">Slide 5</div>
      <div class="swiper-slide">Slide 6</div>

    </div>

    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <div class="swiper-scrollbar"></div>

  </div>

`

const swiper = new Swiper('.swiper', {

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
  }

});






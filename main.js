'use strict';

// Make navbar transparent when in is on the top

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView();
}

const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) => {
  const dataset = event.target.dataset;
  const link = dataset.link;
  console.log(link);

  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// Handle click on "contact me" button on home

const homeContactBtn = document.querySelector('.home__contact');

homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Handle click on logo on navbar

const navbarLogo = document.querySelector('.navbar__logo');

navbarLogo.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Make home slowly fade to transparent when the window scrolls down

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  const scrolledHeight = window.scrollY;
  home.style.opacity = 1 - scrolledHeight / homeHeight;
});

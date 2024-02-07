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

const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }

  // Remove the toggle menu bar when clicked
  navbarMenu.classList.remove('open');

  scrollIntoView(link);
});

// Navbar toggle button for small screen

const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');

navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle click on "contact me" button on home

// const homeContactBtn = document.querySelector('.home__contact');

// homeContactBtn.addEventListener('click', () => {
//   scrollIntoView('contact');
// });

// Handle click on logo on navbar

const navbarLogo = document.querySelector('.navbar__logo');

navbarLogo.addEventListener('click', () => {
  scrollIntoView('home');
});

// Make home slowly fade to transparent when the window scrolls down

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling up

const arrowUpBtn = document.querySelector('.arrow-up-btn');

document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUpBtn.classList.add('visible');
  } else {
    arrowUpBtn.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button

arrowUpBtn.addEventListener('click', () => {
  scrollIntoView('home');
});

// Projects

const categoryBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

categoryBtnContainer.addEventListener('click', (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  projectContainer.classList.add('anim-out');

  setTimeout(() => {
    projectContainer.classList.remove('anim-out');
    projects.forEach((project) => {
      if (filter === 'all' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
  }, 300);

  // Remove selection from the previous item and select the new one

  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target =
    event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add('selected');
});

// Active selected menu item when scrolled to specific section
// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sections = document.querySelectorAll('section');
const menuItems = document.querySelectorAll('.navbar__menu__item');

let selectedSectionId;

function selectMenuItem(selector) {
  menuItems.forEach((item) => {
    if (item.dataset.link === selector) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(`#${selector}`);
  scrollTo.scrollIntoView();
  selectMenuItem(selector);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      if (entry.boundingClientRect.y < 0) {
        selectedSectionId = entry.target.nextElementSibling.id;
      } else {
        selectedSectionId = entry.target.previousElementSibling.id;
      }
    } else {
      return;
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', (event) => {
  if (window.scrollY === 0) {
    selectedSectionId = 'home';
  } else if (
    Math.round(window.scrollY + window.innerHeight) ===
    document.body.clientHeight
  ) {
    selectedSectionId = 'contact';
  }

  selectMenuItem(selectedSectionId);
});

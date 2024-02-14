'use strict';

// Typing Animation
var typed = new Typed('.typing-animation', {
  strings: ["I'm Leon Lim ✨", 'A Front-end Web Developer ⭐️'],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 1000,
  loop: true,
});

// Make home slowly fade to transparent when the window scrolls down
// Make tech stack icons disappear and appear
const nav = document.querySelector('#navbar');
const navbarHeight = nav.offsetHeight;

const homeProfile = document.querySelector('.home__profile');
const home = document.querySelector('#home');
const homeProfileHeight = homeProfile.clientHeight;
const homeHeight = home.offsetHeight;

const homeTechStack = document.querySelector('.home__tech-stack');
const techStackIcons = document.querySelector('.tech-stack-icons');

const progressLine = document.querySelectorAll('.progress-line');
const progressLineSpan = document.querySelectorAll('.progress-line span');

const techStackPercentage = document.querySelectorAll(
  '.tech-stack-percentage h3'
);

console.log(homeHeight);
console.log(homeProfileHeight);
console.log(scroll);

document.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  homeProfile.style.opacity = 1 - scroll / homeProfileHeight;
  if (scroll >= (homeHeight * 2) / 3) {
    homeTechStack.style.transform = 'translateY(50px)';
    homeTechStack.style.opacity = 0;

    techStackIcons.style.transform = 'translateX(0px)';
    techStackIcons.style.opacity = 1;

    progressLine.forEach((line) => {
      line.style.transform = 'scaleX(1)';
    });

    progressLineSpan.forEach((line) => {
      line.style.transform = 'scaleX(1)';
    });

    techStackPercentage.forEach((text) => {
      text.style.opacity = 1;
    });
  } else {
    homeTechStack.style.transform = 'translateY(0px)';
    homeTechStack.style.opacity = 1;

    techStackIcons.style.transform = 'translateX(-50px)';
    techStackIcons.style.opacity = 0;

    progressLine.forEach((line) => {
      line.style.transform = 'scaleX(0)';
    });

    progressLineSpan.forEach((line) => {
      line.style.transform = 'scaleX(0)';
    });

    techStackPercentage.forEach((text) => {
      text.style.opacity = 0;
    });
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
const mobileNav = document.querySelector('.mobile__nav');
const cancelBtn = document.querySelector('.cancel-btn');

mobileNav.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }

  // Remove the toggle menu bar when clicked
  mobileNav.classList.remove('open');
  mobileNav.classList.add('close');

  scrollIntoView(link);
});

navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');

navbarToggleBtn.addEventListener('click', () => {
  mobileNav.classList.add('open');
  mobileNav.classList.remove('close');
});

// Handle clicking cancel button
cancelBtn.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  mobileNav.classList.add('close');
});

// Handle click on logo on navbar
const navbarLogo = document.querySelector('.navbar__logo');

navbarLogo.addEventListener('click', () => {
  scrollIntoView('home');
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

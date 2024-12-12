//recuperation du container du menu
const iconMobile = document.querySelector(".header-menu-icon");
const headerMenu = document.querySelector(".header-menu");
let mobileMenuDOM;
let isMenuOpen = false;

const closeMenu = () => {
  mobileMenuDOM.classList.remove("open");
};

const createMobileMenu = () => {
  mobileMenuDOM = document.createElement("div");
  mobileMenuDOM.classList.add("mobile-menu");
  mobileMenuDOM.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  mobileMenuDOM.append(headerMenu.querySelector("ul").cloneNode(true));
  headerMenu.append(mobileMenuDOM);
};

const openMenu = () => {
  if (mobileMenuDOM) {
  } else {
    createMobileMenu();
  }
  mobileMenuDOM.classList.add("open");
};

const toggleMobileMenu = (event) => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
};
iconMobile.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMobileMenu();
});

//si le menu est ouvert et qu'on clieqieu
window.addEventListener("click", () => {
  if (isMenuOpen) {
    toggleMobileMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 480 && isMenuOpen) {
    toggleMobileMenu();
  }
});

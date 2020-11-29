'use strict';
(function () {
  var MAIN_NAV_MENU_CLOSE_CLASS = 'main-nav__menu--close';
  var MAIN_CLOSE_CLASS = 'main--close';
  var MAIN_PAGE_MENU_OPEN_CLASS = 'page--menu-open';
  var MENU_BUTTON_OPENED_CLASS = 'man-nav__menu-toggle--opened';

  var mainPage = document.querySelector('.page');
  var buttonMenu = mainPage.querySelector('.man-nav__menu-toggle');
  var menu = mainPage.querySelector('.main-nav__menu');
  var main = mainPage.querySelector('.main');


  buttonMenu.addEventListener('click', function () {
    menu.classList.toggle(MAIN_NAV_MENU_CLOSE_CLASS);
    main.classList.toggle(MAIN_CLOSE_CLASS);
    mainPage.classList.toggle(MAIN_PAGE_MENU_OPEN_CLASS);
    buttonMenu.classList.toggle(MENU_BUTTON_OPENED_CLASS);
  });
})();

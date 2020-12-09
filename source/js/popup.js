'use strict';
(function () {
  var POPUP_CLOSE_CLASS = 'popup--close';
  var POPUP_WRAPPER_CLOSE_CLASS = 'popup__wrapper--close';
  var SCROLL_LOCK_CLASS = 'scroll-lock';
  var ESCAPE_KEY = 'Escape';

  var body = document.querySelector('body');
  var popup = document.querySelector('.popup');

  var closePopupButtons = popup.querySelectorAll('.popup__wrapper-close-button');

  var chooseCityButton = document.querySelector('.main-nav__contacts-city');
  var cityPopup = popup.querySelector('.popup__wrapper--city');
  var popupWrappers = popup.querySelectorAll('.popup__wrapper');

  var askQuestionButton = document.querySelector('.footer__ask-question');
  var askQuestionPopup = popup.querySelector('.popup__wrapper--ask-question');
  var inputName = popup.querySelector('input[name=name]');

  var closeAll = function () {
    popup.classList.add(POPUP_CLOSE_CLASS);
    Array.prototype.forEach.call(popupWrappers, function (it) {
      it.classList.add(POPUP_WRAPPER_CLOSE_CLASS);
    });
    body.classList.remove(SCROLL_LOCK_CLASS);
  };

  var toggleClass = function (node, className) {
    node.classList.toggle(className);
  };

  var escButtonHandler = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      closeAll();
      document.removeEventListener('keydown', escButtonHandler);
    }
  };

  var togglePopup = function () {
    toggleClass(popup, POPUP_CLOSE_CLASS);
    toggleClass(body, SCROLL_LOCK_CLASS);
  };

  var toggleCityPopup = function () {
    togglePopup();
    toggleClass(cityPopup, POPUP_WRAPPER_CLOSE_CLASS);
  };

  var toggleAskQuestionPopup = function () {
    togglePopup();
    toggleClass(askQuestionPopup, POPUP_WRAPPER_CLOSE_CLASS);
  };

  if (popup) {
    popup.addEventListener('click', function () {
      document.removeEventListener('keydown', escButtonHandler);
      closeAll();
    });
  }

  if (popupWrappers) {
    Array.prototype.forEach.call(popupWrappers, function (node) {
      node.addEventListener('click', function (evt) {
        evt.stopPropagation();
      });
    });
  }


  if (chooseCityButton) {
    chooseCityButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      document.addEventListener('keydown', escButtonHandler);
      toggleCityPopup();
    });
  }

  if (closePopupButtons) {
    Array.prototype.forEach.call(closePopupButtons, function (it) {
      it.addEventListener('click', function (evt) {
        evt.preventDefault();
        document.removeEventListener('keydown', escButtonHandler);
        closeAll();
      });
    });
  }

  if (askQuestionButton) {
    askQuestionButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      document.addEventListener('keydown', escButtonHandler);
      toggleAskQuestionPopup();
      inputName.focus();
    });
  }
})();

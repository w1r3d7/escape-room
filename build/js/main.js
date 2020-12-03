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


  if (buttonMenu) {
    buttonMenu.addEventListener('click', function () {
      menu.classList.toggle(MAIN_NAV_MENU_CLOSE_CLASS);
      main.classList.toggle(MAIN_CLOSE_CLASS);
      mainPage.classList.toggle(MAIN_PAGE_MENU_OPEN_CLASS);
      buttonMenu.classList.toggle(MENU_BUTTON_OPENED_CLASS);
    });
  }

})();

'use strict';
(function () {
  var POPUP_CLOSE_CLASS = 'popup--close';
  var POPUP_WRAPPER_CLOSE_CLASS = 'popup__wrapper--close';
  var VALID_INPUT_WRAPPER_CLASS = 'popup__wrapper-input--valid';
  var SCROLL_LOCK_CLASS = 'scroll-lock';
  var INVALID_INPUT_WRAPPER_CLASS = 'popup__wrapper-input--invalid';
  var EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var NAME_FIELD = 'name';
  var EMAIL_FIELD = 'email';
  var QUESTION_FIELD = 'question';

  var popup = document.querySelector('.popup');
  var popupWrapper = popup.querySelector('.popup__wrapper--ask-question');
  var popupForm = popupWrapper.querySelector('form');
  var inputName = popupForm.querySelector('input[name="name"]');
  var inputEmail = popupForm.querySelector('input[name="email"]');
  var textAreaQuestion = popupForm.querySelector('textarea');
  var submitButton = popupForm.querySelector('button');
  var inputAgreement = popupForm.querySelector('.popup__agreement').querySelector('input');
  var inputWrappers = popupForm.querySelectorAll('.popup__wrapper-input');

  var storage = window.localStorage;
  var nameField = storage.getItem(NAME_FIELD);
  var emailField = storage.getItem(EMAIL_FIELD);
  var questionField = storage.getItem(QUESTION_FIELD);

  if (nameField) {
    inputName.value = nameField;
  }

  if (emailField) {
    inputEmail.value = emailField;
  }

  if (questionField) {
    textAreaQuestion.value = questionField;
  }

  var addValidClass = function (element) {
    element.classList.remove(INVALID_INPUT_WRAPPER_CLASS);
    element.classList.add(VALID_INPUT_WRAPPER_CLASS);
  };

  var addInvalidClass = function (element) {
    element.classList.add(INVALID_INPUT_WRAPPER_CLASS);
    element.classList.remove(VALID_INPUT_WRAPPER_CLASS);
  };

  var validateEmail = function (value) {
    return EMAIL_REG.test(value);
  };

  var validateForm = function () {
    var isValid = true;

    Array.prototype.forEach.call(inputWrappers, function (it) {
      if (!it.classList.contains(VALID_INPUT_WRAPPER_CLASS)) {
        isValid = false;
      }
    });

    if (!inputAgreement.checked) {
      isValid = false;
    }

    if (isValid) {
      submitButton.disabled = false;
    }
  };

  if (textAreaQuestion) {
    textAreaQuestion.addEventListener('input', function (evt) {
      storage.setItem(QUESTION_FIELD, String(evt.target.value));
    });
  }

  if (inputName) {
    inputName.addEventListener('input', function (evt) {
      var parent = evt.target.parentElement;
      storage.setItem(NAME_FIELD, String(evt.target.value));
      if (evt.target.value.length > 1) {
        addValidClass(parent);
      } else {
        addInvalidClass(parent);
      }
      validateForm();
    });
  }

  if (inputEmail) {
    inputEmail.addEventListener('input', function (evt) {
      var parent = evt.target.parentElement;
      storage.setItem(EMAIL_FIELD, String(evt.target.value));
      if (validateEmail(evt.target.value)) {
        addValidClass(parent);
      } else {
        addInvalidClass(parent);
      }
      validateForm();
    });
  }

  if (inputAgreement) {
    inputAgreement.addEventListener('change', function () {
      validateForm();
    });
  }

  if (popupForm) {
    popupForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      evt.target.reset();
      Array.prototype.forEach.call(inputWrappers, function (it) {
        it.classList.remove(VALID_INPUT_WRAPPER_CLASS);
      });
      submitButton.disabled = true;
      popup.classList.add(POPUP_CLOSE_CLASS);
      popupWrapper.classList.add(POPUP_WRAPPER_CLOSE_CLASS);
      document.querySelector('body').classList.remove(SCROLL_LOCK_CLASS);
    });
  }
})();

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
    });
  }
})();

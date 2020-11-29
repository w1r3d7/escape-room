'use strict';
(function () {
  var POPUP_CLOSE_CLASS = 'popup--close';
  var POPUP_WRAPPER_CLOSE_CLASS = 'popup__wrapper--close';
  var VALID_INPUT_WRAPPER_CLASS = 'popup__wrapper-input--valid';
  var SCROLL_LOCK_CLASS = 'scroll-lock';
  var INVALID_INPUT_WRAPPER_CLASS = 'popup__wrapper-input--invalid';
  var EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var popup = document.querySelector('.popup');
  var popupWrapper = popup.querySelector('.popup__wrapper--ask-question');
  var popupForm = popupWrapper.querySelector('form');
  var inputName = popupForm.querySelector('input[name="name"]');
  var inputEmail = popupForm.querySelector('input[name="email"]');
  var submitButton = popupForm.querySelector('button');
  var inputAgreement = popupForm.querySelector('.popup__agreement').querySelector('input');
  var inputWrappers = popupForm.querySelectorAll('.popup__wrapper-input');

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

  if (inputName) {
    inputName.addEventListener('input', function (evt) {
      var parent = evt.target.parentElement;
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
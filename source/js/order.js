'use strict';
(function () {
  var DATE_PICKER_CLOSE_CLASS = 'order__date-picker--close';
  var ORDER_PROMPT_CLOSE_CLASS = 'order__prompt--close';
  var ORDER_FORM_CLOSE_CLASS = 'order-inputs-wrapper--close';
  var ORDER_PICKED_QUEST_CLOSE_CLASS = 'order__picked-quest--close';

  var order = document.querySelector('.order');
  var orderDatePicker = order.querySelector('.order__date-picker');
  var pickDateButton = orderDatePicker.querySelector('.order__date-pick');
  var orderPrompt = order.querySelector('.order__prompt');
  var orderInputsWrapper = order.querySelector('.order-inputs-wrapper');
  var formInputs = orderInputsWrapper.querySelectorAll('input');
  var orderDate = order.querySelector('.order__date-picker').querySelector('time').textContent;
  var orderPickedQuest = order.querySelector('.order__picked-quest');
  var orderPickedTime = orderPickedQuest.querySelector('.order__picked-quest-date');
  var orderPicketPrice = orderPickedQuest.querySelector('.order__picked-quest-price');
  var submitButton = order.querySelector('button[type=submit]');

  var openTimePicker = function () {
    orderDatePicker.classList.remove(DATE_PICKER_CLOSE_CLASS);
    orderPrompt.classList.remove(ORDER_PROMPT_CLOSE_CLASS);
    orderInputsWrapper.classList.remove(ORDER_FORM_CLOSE_CLASS);
  };

  var openPickedQuest = function () {
    if (orderPickedQuest.classList.contains(ORDER_PICKED_QUEST_CLOSE_CLASS)) {
      orderPickedQuest.classList.remove(ORDER_PICKED_QUEST_CLOSE_CLASS);
    }
  };

  if (submitButton) {
    submitButton.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }


  if (pickDateButton) {
    pickDateButton.addEventListener('click', function () {
      openTimePicker();
    });
  }

  if (formInputs) {
    Array.prototype.forEach.call(formInputs, function (input) {
      input.addEventListener('change', function (evt) {
        openPickedQuest();
        orderPickedTime.textContent = orderDate + ' в ' + evt.target.value;
        var price = evt.target.parentElement.querySelector('span').textContent;
        orderPicketPrice.textContent = price;
      });
    });
  }
})();

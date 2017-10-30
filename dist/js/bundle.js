(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var caseContainer = document.querySelector('.card-case-container');
var cardCase = document.querySelector('.card-case');
var btnList = cardCase.querySelectorAll('.btn-set .btn');
var cards = cardCase.querySelectorAll('.cards .card');

var getCard = function getCard(e) {
  var currentBtn = e.currentTarget.dataset.to;
  return document.querySelector('[data-card="' + currentBtn + '"]');
};
var enterBtn = function enterBtn(e) {
  var targetCard = getCard(e);
  targetCard.classList.add('is-hover');
};
var leaveBtn = function leaveBtn(e) {
  var targetCard = getCard(e);
  targetCard.classList.remove('is-hover');
};
var takeCard = function takeCard(e) {
  var targetCard = getCard(e);
  cards.forEach(function (card) {
    card.classList.remove('is-taken');
  });

  caseContainer.classList.add('is-active');

  targetCard.classList.toggle('is-taken');
};

[].forEach.call(btnList, function (btn) {
  btn.addEventListener('mouseenter', function (e) {
    enterBtn(e);
  });
  btn.addEventListener('mouseleave', function (e) {
    leaveBtn(e);
  });
  btn.addEventListener('click', function (e) {
    takeCard(e);
  });
});

/* eslint no-unused-vars:0 */
document.addEventListener('DOMContentLoaded', function () {
  console.log('rex-tsou.com');
});

})));

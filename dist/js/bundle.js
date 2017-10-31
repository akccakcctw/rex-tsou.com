(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var getCard = function getCard(el) {
  var currentBtn = el.dataset.to;
  return document.querySelector('[data-card="' + currentBtn + '"]');
};
var enterBtn = function enterBtn(el) {
  var targetCard = getCard(el);
  targetCard.classList.add('is-hover');
};
var leaveBtn = function leaveBtn(el) {
  var targetCard = getCard(el);
  targetCard.classList.remove('is-hover');
};
var takeCard = function takeCard(el) {
  var targetCard = getCard(el);
  targetCard.classList.toggle('is-taken');
};

var expandCard = function expandCard(el) {
  var targetCard = getCard(el);
  var targetContent = targetCard.querySelector('.card__content');
  targetCard.style.maxHeight = targetContent.getBoundingClientRect().height + 30 + 'px';
};

/* eslint no-unused-vars:0 */
/* global Velocity */
document.addEventListener('DOMContentLoaded', function () {
  var caseContainer = document.querySelector('.card-case-container');
  var caseEl = document.querySelector('.card-case');
  var btnList = caseEl.querySelectorAll('.btn-set .btn');
  var cards = caseEl.querySelectorAll('.cards .card');
  console.log('rex-tsou.com');

  [].forEach.call(btnList, function (btn) {
    btn.addEventListener('mouseenter', function (e) {
      enterBtn(e.currentTarget);
    });
    btn.addEventListener('mouseleave', function (e) {
      leaveBtn(e.currentTarget);
    });
    btn.addEventListener('click', function (e) {
      var el = e.currentTarget;
      cards.forEach(function (card) {
        card.classList.remove('is-taken');
        card.style.maxHeight = '100%';
      });
      caseContainer.classList.add('is-active');
      takeCard(el);
      setTimeout(function () {
        expandCard(el);
      }, 1500);
    });
  });
});

})));

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
var expandCard = function expandCard(el) {
  var targetCard = getCard(el);
  var targetContent = targetCard.querySelector('.card__content');
  Velocity(targetCard, { maxHeight: targetContent.getBoundingClientRect().height + 30 + 'px' });
};
var takeCard = function takeCard(el) {
  var targetCard = getCard(el);
  Velocity(targetCard, { translateX: '100%' }, {
    duration: 1000,
    easing: 'easeInOut',
    complete: function complete() {
      targetCard.classList.add('is-taken');
      expandCard(el);
    }
  });
};
var packCard = function packCard(el, cb) {
  if (el) {
    el.classList.remove('is-taken');
    Velocity(el, { translateX: '', maxHeight: '100%' }, { complete: cb });
  } else {
    cb();
  }
};

document.addEventListener('DOMContentLoaded', function () {
  var caseContainer = document.querySelector('.card-case-container');
  var caseEl = document.querySelector('.card-case');
  var btnList = caseEl.querySelectorAll('.btn-set .btn');
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
      var takenCard = document.querySelector('.is-taken');
      packCard(takenCard, function () {
        caseContainer.classList.add('is-active');
        takeCard(el);
      });
    });
  });
});

})));

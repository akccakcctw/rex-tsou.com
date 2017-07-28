(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var btnList = document.querySelectorAll('.card-case .btn-set .btn');
var enterBtn = function enterBtn(e) {
  var currentBtn = e.currentTarget.dataset.to;
  var targetCardReal = document.querySelector('.card-real .card-' + currentBtn);
  targetCardReal.classList.add('is-hover');
};
var leaveBtn = function leaveBtn(e) {
  var currentBtn = e.currentTarget.dataset.to;
  var targetCardReal = document.querySelector('.card-real .card-' + currentBtn);
  targetCardReal.classList.remove('is-hover');
};

[].forEach.call(btnList, function (btn) {
  btn.addEventListener('mouseenter', function (e) {
    enterBtn(e);
  });
  btn.addEventListener('mouseleave', function (e) {
    leaveBtn(e);
  });
});

/* eslint no-unused-vars:0 */
document.addEventListener('DOMContentLoaded', function () {
  console.log('rex-tsou.com');
});

})));

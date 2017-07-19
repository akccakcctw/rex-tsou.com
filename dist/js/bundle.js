(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var btnList = document.querySelectorAll('.card-case .btn-set .btn');

[].forEach.call(btnList, function (btn) {
  btn.addEventListener('mouseenter', function (e) {
    var currentBtn = e.currentTarget.dataset.to;
    var targetCardReal = document.querySelector('.card-real .card-' + currentBtn);
    targetCardReal.classList.add('is-hover');
  });
  btn.addEventListener('mouseleave', function (e) {});
});

/* eslint no-unused-vars:0 */
document.addEventListener('DOMContentLoaded', function () {
  console.log('rex-tsou.com');
});

})));

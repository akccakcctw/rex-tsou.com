/* eslint no-unused-vars:0 */
/* global Velocity */
import * as CardCase from './card-case/index';

document.addEventListener('DOMContentLoaded', () => {
  const V = Velocity;
  const caseContainer = document.querySelector('.card-case-container');
  const caseEl = document.querySelector('.card-case');
  const btnList = caseEl.querySelectorAll('.btn-set .btn');
  const cards = caseEl.querySelectorAll('.cards .card');
  console.log('rex-tsou.com');

  [].forEach.call(btnList, (btn) => {
    btn.addEventListener('mouseenter', (e) => { CardCase.enterBtn(e.currentTarget); });
    btn.addEventListener('mouseleave', (e) => { CardCase.leaveBtn(e.currentTarget); });
    btn.addEventListener('click', (e) => {
      const el = e.currentTarget;
      cards.forEach((card) => {
        card.classList.remove('is-taken');
        card.style.maxHeight = '100%';
      });
      caseContainer.classList.add('is-active');
      CardCase.takeCard(el);
      setTimeout(() => {
        CardCase.expandCard(el);
      }, 1500);
    });
  });
});

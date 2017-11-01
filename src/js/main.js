import * as CardCase from './card-case/index';

document.addEventListener('DOMContentLoaded', () => {
  const caseContainer = document.querySelector('.card-case-container');
  const caseEl = document.querySelector('.card-case');
  const btnList = caseEl.querySelectorAll('.btn-set .btn');
  console.log('rex-tsou.com');

  [].forEach.call(btnList, (btn) => {
    btn.addEventListener('mouseenter', (e) => { CardCase.enterBtn(e.currentTarget); });
    btn.addEventListener('mouseleave', (e) => { CardCase.leaveBtn(e.currentTarget); });
    btn.addEventListener('click', (e) => {
      const el = e.currentTarget;
      const takenCard = document.querySelector('.is-taken');
      CardCase.packCard(takenCard, () => {
        caseContainer.classList.add('is-active');
        CardCase.takeCard(el);
      });
    });
  });
});

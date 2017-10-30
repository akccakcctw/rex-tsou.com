const caseContainer = document.querySelector('.card-case-container');
const cardCase = document.querySelector('.card-case');
const btnList = cardCase.querySelectorAll('.btn-set .btn');
const cards = cardCase.querySelectorAll('.cards .card');

const getCard = (e) => {
  const currentBtn = e.currentTarget.dataset.to;
  return document.querySelector(`[data-card="${currentBtn}"]`);
};
const enterBtn = (e) => {
  const targetCard = getCard(e);
  targetCard.classList.add('is-hover');
};
const leaveBtn = (e) => {
  const targetCard = getCard(e);
  targetCard.classList.remove('is-hover');
};
const takeCard = (e) => {
  const targetCard = getCard(e);
  cards.forEach((card) => {
    card.classList.remove('is-taken');
  });

  caseContainer.classList.add('is-active');

  targetCard.classList.toggle('is-taken');
};

[].forEach.call(btnList, (btn) => {
  btn.addEventListener('mouseenter', (e) => {
    enterBtn(e);
  });
  btn.addEventListener('mouseleave', (e) => {
    leaveBtn(e);
  });
  btn.addEventListener('click', (e) => {
    takeCard(e);
  });
});

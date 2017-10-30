const btnList = document.querySelectorAll('.card-case .btn-set .btn');
const cards = document.querySelectorAll('.card-case .cards .card');

const getCard = (e) => {
  const currentBtn = e.currentTarget.dataset.to;
  return document.querySelector(`.cards .card-${currentBtn}`);
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
  cards.forEach((card) => {
    card.classList.remove('is-taken');
  });
  const targetCard = getCard(e);
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

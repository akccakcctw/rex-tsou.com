const btnList = document.querySelectorAll('.card-case .btn-set .btn');
const getTargetCardReal = (e) => {
  const currentBtn = e.currentTarget.dataset.to;
  return document.querySelector(`.card-real .card-${currentBtn}`);
};
const enterBtn = (e) => {
  const targetCard = getTargetCardReal(e);
  targetCard.classList.add('is-hover');
};
const leaveBtn = (e) => {
  const targetCard = getTargetCardReal(e);
  targetCard.classList.remove('is-hover');
};
const takeCard = (e) => {
  const targetCard = getTargetCardReal(e);
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

const btnList = document.querySelectorAll('.card-case .btn-set .btn');
const enterBtn = (e) => {
  const currentBtn = e.currentTarget.dataset.to;
  const targetCardReal = document.querySelector(`.card-real .card-${currentBtn}`);
  targetCardReal.classList.add('is-hover');
};
const leaveBtn = (e) => {
  const currentBtn = e.currentTarget.dataset.to;
  const targetCardReal = document.querySelector(`.card-real .card-${currentBtn}`);
  targetCardReal.classList.remove('is-hover');
};


[].forEach.call(btnList, (btn) => {
  btn.addEventListener('mouseenter', (e) => {
    enterBtn(e);
  });
  btn.addEventListener('mouseleave', (e) => {
    leaveBtn(e);
  });
});

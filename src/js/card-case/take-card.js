const btnList = document.querySelectorAll('.card-case .btn-set .btn');

[].forEach.call(btnList, (btn) => {
  btn.addEventListener('mouseenter', (e) => {
    const currentBtn = e.currentTarget.dataset.to;
    const targetCardReal = document.querySelector(`.card-real .card-${currentBtn}`);
    targetCardReal.classList.add('is-hover');
  });
  btn.addEventListener('mouseleave', (e) => {
  });
});

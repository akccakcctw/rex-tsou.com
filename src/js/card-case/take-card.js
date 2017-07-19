const btnList = document.querySelectorAll('.card-case .btn-set .btn');

[].forEach.call(btnList, (btn) => {
  btn.addEventListener('mouseenter', (e) => {
    const currentBtn = e.currentTarget.dataset.to;
  });
  btn.addEventListener('mouseleave', (e) => {
  });
});

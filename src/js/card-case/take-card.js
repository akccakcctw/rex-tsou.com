export const getCard = (el) => {
  const currentBtn = el.dataset.to;
  return document.querySelector(`[data-card="${currentBtn}"]`);
};
export const enterBtn = (el) => {
  const targetCard = getCard(el);
  targetCard.classList.add('is-hover');
};
export const leaveBtn = (el) => {
  const targetCard = getCard(el);
  targetCard.classList.remove('is-hover');
};
export const expandCard = (el) => {
  const targetCard = getCard(el);
  const targetContent = targetCard.querySelector('.card__content');
  Velocity(targetCard, { maxHeight: `${targetContent.getBoundingClientRect().height + 30}px` })
};
export const takeCard = (el) => {
  const targetCard = getCard(el);
  Velocity(targetCard, { translateX: '100%' }, {
    duration: 1000,
    easing: 'easeInOut',
    complete: () => {
      targetCard.classList.add('is-taken');
      expandCard(el);
    },
  });
};
export const packCard = (el, cb) => {
  if (el) {
    el.classList.remove('is-taken');
    Velocity(el, { translateX: '', maxHeight: '100%' }, { complete: cb });
  } else {
    cb();
  }
};

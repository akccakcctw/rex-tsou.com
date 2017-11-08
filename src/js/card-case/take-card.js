export const getCardCase = () => document.querySelector('.card-case');
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
export const expandCard = (el, cb) => {
  const targetCard = getCard(el);
  const targetContent = targetCard.querySelector('.card__content');
  if (targetCard.classList.contains('big')) {
    Velocity(targetCard, { width: `${window.innerWidth - getCardCase().offsetWidth - 80}px` }, {
      duration: 500,
      complete: () => {
        setTimeout(() => {
          Velocity(targetCard, { maxHeight: `${targetContent.getBoundingClientRect().height + 30}px` }, { complete: cb });
        }, 500);
      },
    });
  } else {
    Velocity(targetCard, { maxHeight: `${targetContent.getBoundingClientRect().height + 30}px` }, { complete: cb });
  }
};
export const takeCard = (el, cb) => {
  const targetCard = getCard(el);
  Velocity(targetCard, { translateX: getCardCase().offsetWidth }, {
    duration: 500,
    easing: 'easeInOut',
    complete: () => {
      targetCard.classList.add('is-taken');
      expandCard(el, cb);
    },
  });
};
export const packCard = (el, cb) => {
  if (el) {
    Velocity(el, { maxHeight: '100%' }, {
      duration: 500,
      complete: () => {
        el.classList.remove('is-taken');
        Velocity(el, { translateX: '', width: '100%' }, { complete: cb });
      },
    });
  } else {
    cb();
  }
};

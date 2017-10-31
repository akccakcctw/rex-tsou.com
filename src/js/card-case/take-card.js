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
export const takeCard = (el) => {
  const targetCard = getCard(el);
  targetCard.classList.toggle('is-taken');
};

export const expandCard = (el) => {
  const targetCard = getCard(el);
  const targetContent = targetCard.querySelector('.card__content');
  targetCard.style.maxHeight = `${targetContent.getBoundingClientRect().height + 30}px`;
};

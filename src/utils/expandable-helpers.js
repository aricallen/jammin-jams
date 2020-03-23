/* eslint-disable no-param-reassign */

export const collapseSection = (elem) => {
  // get scroll height of content
  const sectionHeight = elem.scrollHeight;

  // temporarily disable all css transitions
  const elemTransition = elem.style.transition;
  elem.style.transition = '';

  // set to height and ready to transition to 0
  requestAnimationFrame(() => {
    elem.style.height = `${sectionHeight}px`;
    elem.style.transition = elemTransition;

    // reset to 0px to allow transition
    requestAnimationFrame(() => {
      elem.style.height = '0px';
    });
  });
};

export const expandSection = (elem) => {
  // get scroll height of inner content
  const sectionHeight = elem.scrollHeight;

  // have the elem transition to the height of its inner content
  elem.style.height = `${sectionHeight}px`;

  elem.addEventListener('transitionend', function onTransitionEnd() {
    // cleanup
    elem.removeEventListener('transitionend', onTransitionEnd);

    // reset to auto
    elem.style.height = 'auto';
  });
};

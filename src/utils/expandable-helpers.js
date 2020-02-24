/* eslint-disable no-param-reassign */

export const collapseSection = (ref) => {
  // get scroll height of content
  const sectionHeight = ref.scrollHeight;

  // temporarily disable all css transitions
  const refTransition = ref.style.transition;
  ref.style.transition = '';

  // set to height and ready to transition to 0
  requestAnimationFrame(() => {
    ref.style.height = `${sectionHeight}px`;
    ref.style.transition = refTransition;

    // reset to 0px to allow transition
    requestAnimationFrame(() => {
      ref.style.height = '0px';
    });
  });
};

export const expandSection = (ref) => {
  // get scroll height of inner content
  const sectionHeight = ref.scrollHeight;

  // have the ref transition to the height of its inner content
  ref.style.height = `${sectionHeight}px`;

  ref.addEventListener('transitionend', function onTransitionEnd() {
    // cleanup
    ref.removeEventListener('transitionend', onTransitionEnd);

    // reset to auto
    ref.style.height = 'auto';
  });
};

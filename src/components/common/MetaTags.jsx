import PropTypes from 'prop-types';

export const MetaTags = (props) => {
  const { title, description, path } = props;
  const computedTitle = `${title} | Jam Subscription Service | Jammin' Jams`;
  const url = `https://jmnjams.com/${path.replace(/^\//, '')}`;
  document.head.querySelector('title').innerText = computedTitle;

  document.head.querySelector('meta[property="og:title"]').setAttribute('content', computedTitle);
  document.head.querySelector('meta[property="og:url"]').setAttribute('content', url);
  document.head
    .querySelector('meta[property="og:description"]')
    .setAttribute('content', description);

  document.head.querySelector('meta[name="description"]').setAttribute('content', description);
  return null;
};

MetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

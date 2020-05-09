import PropTypes from 'prop-types';

const cleanPath = (path) => path.replace(/^\//, '').replace(/^https:\/\/jmnjams.com\//, '');

const fullUrl = (path) => `https://jmnjams.com/${cleanPath(path)}`;

export const MetaTags = (props) => {
  const { title, description, path, ogImage } = props;
  const computedTitle = `${title} | Jam Subscription Service | Jammin' Jams`;
  document.head.querySelector('title').innerText = computedTitle;

  document.head.querySelector('meta[property="og:title"]').setAttribute('content', computedTitle);
  document.head.querySelector('meta[property="og:url"]').setAttribute('content', fullUrl(path));
  document.head
    .querySelector('meta[property="og:description"]')
    .setAttribute('content', description);

  document.head.querySelector('meta[name="description"]').setAttribute('content', description);
  if (ogImage) {
    document.head
      .querySelector('meta[property="og:image"]')
      .setAttribute('content', fullUrl(ogImage));
  }
  return null;
};

MetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

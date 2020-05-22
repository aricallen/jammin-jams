import axios from 'axios';

const cleanPath = (path) => path.replace(/^\/|\/$/, '').replace(/^https:\/\/jmnjams.com\//, '');

const fullUrl = (path) => `https://jmnjams.com/${cleanPath(path)}`;

let _lastUpdatedUrl = null;
let _loadedPagesMeta = null;

/**
 * sets meta tags for currently viewed page according to records in db
 * @param {String} pageUrl e.g. /p/about
 */
export const setMetaTags = async (pageUrl, overrides = {}) => {
  // already set pageUrl
  if (_lastUpdatedUrl === pageUrl) {
    return;
  }

  // not loaded yet
  if (_loadedPagesMeta?.length === null) {
    const pages = await axios.get('/api/admin/pages');
    _loadedPagesMeta = pages;
  }

  // update to check for next time
  _lastUpdatedUrl = pageUrl;

  const pageForUrl = _loadedPagesMeta?.find((p) => p.url === pageUrl);
  // record doesn't exist in db yet... use default index
  const pageRecord = pageForUrl || _loadedPagesMeta?.find((p) => p.url === '/');

  if (!pageRecord) {
    console.error(`no page record for ${pageUrl}`);
    return;
  }

  const combinedRecord = { ...pageRecord, ...overrides };
  const { title, description, image, url } = combinedRecord;
  document.head.querySelector('title').innerText = title;

  document.head.querySelector('meta[property="og:title"]').setAttribute('content', title);
  document.head.querySelector('meta[property="og:url"]').setAttribute('content', fullUrl(url));
  document.head
    .querySelector('meta[property="og:description"]')
    .setAttribute('content', description);

  document.head.querySelector('meta[name="description"]').setAttribute('content', description);
  if (image) {
    document.head
      .querySelector('meta[property="og:image"]')
      .setAttribute('content', fullUrl(image));
  }
  return null;
};

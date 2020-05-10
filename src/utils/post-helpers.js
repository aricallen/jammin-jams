/**
 * currently will be `/jam-journeys/${post.id}` but may change later to a date or live date etc.
 */
export const getPostLink = (post) => {
  return `/jam-journeys/${post?.id}`;
};

const PostStatus = {
  LIVE: 'LIVE',
  DRAFT: 'DRAFT',
};

export const isLive = (post) => post.status === PostStatus.LIVE;
export const isDraft = (post) => post.status === PostStatus.DRAFT;

export const getExcerpt = (post) => {
  const { content = '', excerpt = '' } = post;
  if (excerpt !== '') {
    return excerpt;
  }
  const paragraphs = content.split('\n').filter((str) => str !== '');
  const contentParagraphs = paragraphs.filter((str) => /^\w/.test(str));
  return contentParagraphs[0];
};

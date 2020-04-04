/**
 * currently will be `/posts/${post.id}` but may change later to a date or live date etc.
 */
export const getPostLink = (post) => {
  return `/posts/${post?.id}`;
};

const PostStatus = {
  LIVE: 'LIVE',
  DRAFT: 'DRAFT',
};

export const isLive = (post) => post.status === PostStatus.LIVE;
export const isDraft = (post) => post.status === PostStatus.DRAFT;

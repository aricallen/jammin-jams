/**
 * currently will be `/posts/${post.id}` but may change later to a date or live date etc.
 */
export const getPostLink = (post) => {
  return `/posts/${post?.id}`;
};

import React from 'react';

export const SoundcloudPlayer = ({ setLink, title = 'jammin jams' }) => {
  const encodedLink = window.encodeURIComponent(setLink);
  const src = `https://w.soundcloud.com/player/?url=${encodedLink}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
  return (
    <iframe
      title={title}
      width="100%"
      height="300"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={src}
    />
  );
};

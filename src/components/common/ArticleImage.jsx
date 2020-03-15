import React, { useRef, useState, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { spacing } from '../../constants/style-guide';
import { fontSizes } from '../../utils/style-helpers';
import { getMediumUploadSrc } from '../../utils/upload-helpers';

const Wrapper = styled('div')`
  text-align: center;
  padding: ${spacing.double}px;
`;

const Image = styled('img')``;
const Placeholder = styled('div')`
  background-color: purple;
`;

const Caption = styled('div')`
  padding-top: ${spacing.regular}px;
  font-style: italic;
  ${fontSizes('small')}
`;

export const ArticleImage = ({ upload, width = '100%', height = 'auto' }) => {
  if (!upload) {
    return null;
  }

  const imgRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  const initLoadListener = () => {
    const loadListener = () => {
      setIsLoaded(true);
    };
    imgRef.current.addEventListener('load', loadListener);
  };
  useLayoutEffect(initLoadListener, []);

  return (
    <Wrapper>
      <Image
        src={getMediumUploadSrc(upload)}
        ref={imgRef}
        alt={upload.altText}
        title={upload.title}
        isLoaded={isLoaded}
      />
      {!isLoaded && <Placeholder style={{ width, height }} />}
      <Caption>{upload.caption}</Caption>
    </Wrapper>
  );
};

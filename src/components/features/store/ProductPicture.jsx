import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { media } from '../../../utils/media';
import { Spinner } from '../../common';

const Picture = styled('img')`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled('div')`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 100%;
  ${media.mobile()} {
    height: 400px;
  }
`;

export const ProductPicture = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { imageSrc } = props;
  const ref = useRef();

  if (ref.current?.querySelector('img').completed) {
    setIsLoading(false);
  }

  const onLoad = () => {
    setIsLoading(false);
  };

  return (
    <Wrapper ref={ref}>
      {isLoading ? <Spinner /> : <Picture src={imageSrc} onLoad={onLoad} />}
      <Picture src={imageSrc} />
    </Wrapper>
  );
};

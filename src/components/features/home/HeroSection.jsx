import React from 'react';
import styled from '@emotion/styled';
import { pallet } from '../../../constants/style-guide';
import { getLargeUploadSrc } from '../../../utils/upload-helpers';

const PICTURE_HEIGHT = 600;

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  background-color: ${pallet.charcoal};
  max-height: ${PICTURE_HEIGHT}px;
`;

const Img = styled('img')`
  width: 100%;
  object-fit: cover;
`;

export const HeroSection = () => {
  return (
    <Wrapper>
      <Img src={getLargeUploadSrc({ filename: 'jam2-closeup.jpg' })} />
    </Wrapper>
  );
};

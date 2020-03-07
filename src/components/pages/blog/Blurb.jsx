import React from 'react';
import styled from '@emotion/styled';
import { spacing } from '../../../constants/style-guide';

const Wrapper = styled('div')`
  display: flex;
  padding: ${spacing.double}px;
`;

const ThumbnailWrapper = styled('div')``;
const Thumbnail = styled('img')``;

const TextWrapper = styled('div')``;
const Text = styled('div')``;

export const Blurb = ({ post }) => {
  return (
    <Wrapper>
      <ThumbnailWrapper>
        <Thumbnail src="https://generative-placeholders.glitch.me/image?width=200&height=160" />
      </ThumbnailWrapper>
      <TextWrapper>
        <Text>{post.content}</Text>
      </TextWrapper>
    </Wrapper>
  );
};

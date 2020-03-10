import React from 'react';
import ReactMarkdown from 'react-markdown';
import Color from 'color';
import styled from '@emotion/styled';
import { spacing, pallet } from '../../../constants/style-guide';
import { Row } from '../../common/Tables';
import { UnstyledLink, LinkLikeSpan } from '../../common/Links';
import { getPostLink } from '../../../utils/post-helpers';

const Wrapper = styled(Row)`
  &:hover {
    background-color: ${Color(pallet.strawberry)
      .alpha(0.1)
      .toString()};
  }
  align-items: initial;
`;

const ThumbnailWrapper = styled('div')`
  min-width: 200px;
`;
const Thumbnail = styled('img')``;

const TextWrapper = styled('div')`
  padding: 0 ${spacing.double}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Text = styled('div')`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MoreLinkWrapper = styled('div')`
  text-align: right;
`;

const parseFirstParagraph = (content) => {
  const paragraphs = content.split('\n').filter((str) => str !== '');
  return paragraphs[0];
};

export const Blurb = ({ post }) => {
  const firstParagraph = parseFirstParagraph(post.content);

  return (
    <Wrapper as={UnstyledLink} to={getPostLink(post)}>
      <ThumbnailWrapper>
        <Thumbnail src="https://generative-placeholders.glitch.me/image?width=200&height=160" />
      </ThumbnailWrapper>
      <TextWrapper>
        <Text>
          <ReactMarkdown source={firstParagraph} escapeHtml={false} />
        </Text>
        <MoreLinkWrapper>
          <LinkLikeSpan>Read more</LinkLikeSpan>
        </MoreLinkWrapper>
      </TextWrapper>
    </Wrapper>
  );
};

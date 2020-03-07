import React from 'react';
import ReactMarkdown from 'react-markdown';
import Color from 'color';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Emoji } from '../../common/Structure';
import { spacing, pallet } from '../../../constants/style-guide';
import { Row } from '../../common/Tables';

const Wrapper = styled(Row)`
  &:hover {
    background-color: ${Color(pallet.strawberry)
      .alpha(0.1)
      .toString()};
  }
  align-items: flex-start;
`;

const ThumbnailWrapper = styled('div')`
  min-width: 200px;
`;
const Thumbnail = styled('img')``;

const TextWrapper = styled('div')`
  padding: 0 ${spacing.double}px;
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

/**
 * currently will be `/posts/${post.id}` but may change later to a date or live date etc.
 */
const getPostLink = (post) => {
  return `/posts/${post.id}`;
};

export const Blurb = ({ post }) => {
  const firstParagraph = parseFirstParagraph(post.content);

  const onClick = () => {
    console.log('go to ', getPostLink(post));
  };

  return (
    <Wrapper onClick={onClick}>
      <ThumbnailWrapper>
        <Thumbnail src="https://generative-placeholders.glitch.me/image?width=200&height=160" />
      </ThumbnailWrapper>
      <TextWrapper>
        <Text>
          <ReactMarkdown source={firstParagraph} escapeHtml={false} />
        </Text>
        <MoreLinkWrapper>
          <Link to={getPostLink(post)}>Read more</Link>
        </MoreLinkWrapper>
      </TextWrapper>
    </Wrapper>
  );
};

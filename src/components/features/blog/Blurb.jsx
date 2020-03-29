import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Color from 'color';
import styled from '@emotion/styled';
import { spacing, pallet } from '../../../constants/style-guide';
import { Row } from '../../common/Tables';
import { Header2 } from '../../common/Structure';
import { UnstyledLink, LinkLikeSpan } from '../../common/Links';
import { Spinner } from '../../common/Spinner';
import { getPostLink } from '../../../utils/post-helpers';
import { getSmallUploadSrc } from '../../../utils/upload-helpers';
import { fetchOne } from '../../../redux/uploads/actions';

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
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const contentParagraphs = paragraphs.filter((str) => /^\w/.test(str));
  return contentParagraphs[0];
};

export const Blurb = ({ post }) => {
  const dispatch = useDispatch();
  const uploadsState = useSelector((state) => state.uploads);
  const firstParagraph = parseFirstParagraph(post.content);

  const upload = uploadsState.data.find((u) => u.id === post.heroImgId);
  const fetchUpload = () => {
    if (!upload && post.heroImgId) {
      dispatch(fetchOne(post.heroImgId));
    }
  };
  useEffect(fetchUpload, []);

  const placeholder = post.heroImgId ? (
    <Spinner />
  ) : (
    <Thumbnail src="https://generative-placeholders.glitch.me/image?width=200&height=160" />
  );

  return (
    <Wrapper as={UnstyledLink} to={getPostLink(post)}>
      <ThumbnailWrapper>
        {upload ? <Thumbnail src={getSmallUploadSrc(upload)} /> : placeholder}
      </ThumbnailWrapper>
      <TextWrapper>
        <Header2>{post.title}</Header2>
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

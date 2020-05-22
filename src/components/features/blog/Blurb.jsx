import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Color from 'color';
import styled from '@emotion/styled';
import { spacing, pallet } from '../../../constants/style-guide';
import { Row } from '../../common/Tables';
import { Header2 } from '../../common/Structure';
import { UnstyledLink, LinkLikeSpan } from '../../common/Links';
import { Spinner } from '../../common/Spinner';
import { getPostLink, getExcerpt } from '../../../utils/post-helpers';
import { getSmallUploadSrc } from '../../../utils/upload-helpers';
import { fetchOne } from '../../../redux/uploads/actions';
import { media } from '../../../utils/media';

const IMG_MIN_HEIGHT = 160;

const Wrapper = styled(Row)`
  &:hover {
    background-color: ${Color(pallet.strawberry)
      .alpha(0.1)
      .toString()};
  }
  align-items: initial;
  ${media.mobile()} {
    display: block;
  }
`;

const ThumbnailWrapper = styled('div')`
  min-width: 200px;
  height: ${IMG_MIN_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.mobile()} {
    height: auto;
    min-height: ${IMG_MIN_HEIGHT}px;
    width: 100%;
  }
`;
const Thumbnail = styled('img')`
  width: 100%;
  object-fit: cover;
`;

const FallbackWrapper = styled('div')`
  width: 100%;
  height: 100%;
  min-height: ${IMG_MIN_HEIGHT}px;
  padding: ${spacing.regular}px;
`;

const FallbackImg = styled('div')`
  width: 100%;
  height: 100%;
  min-height: ${IMG_MIN_HEIGHT}px;
  background-image: url('${(p) => p.url}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const TextWrapper = styled('div')`
  padding: 0 ${spacing.double}px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const TopSection = styled('div')`
  flex-grow: 1;
`;

const Text = styled('div')`
  ${media.desktop()} {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const MoreLinkWrapper = styled('div')`
  text-align: right;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const Blurb = ({ post }) => {
  const dispatch = useDispatch();
  const uploadsState = useSelector((state) => state.uploads);
  const firstParagraph = getExcerpt(post);
  const [isFetching, setIsFetching] = useState(!!post.uploadsId);

  const upload = uploadsState.data.find((u) => u.id === post.uploadsId);
  const fetchUpload = async () => {
    if (!upload && post.uploadsId) {
      await dispatch(fetchOne(post.uploadsId));
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchUpload();
  }, []);

  const showSpinnerPlaceholder = !upload && isFetching;
  const placeholder = showSpinnerPlaceholder ? (
    <Spinner />
  ) : (
    <FallbackWrapper>
      <FallbackImg url="/assets/images/logo-pink.png" />
    </FallbackWrapper>
  );

  return (
    <Wrapper as={UnstyledLink} to={getPostLink(post)}>
      <ThumbnailWrapper>
        {upload ? <Thumbnail src={getSmallUploadSrc(upload)} /> : placeholder}
      </ThumbnailWrapper>
      <TextWrapper>
        <TopSection>
          <Header2>{post.title}</Header2>
          <Text>
            <ReactMarkdown source={firstParagraph} escapeHtml={false} />
          </Text>
        </TopSection>
        <MoreLinkWrapper>
          <LinkLikeSpan>Read more</LinkLikeSpan>
        </MoreLinkWrapper>
      </TextWrapper>
    </Wrapper>
  );
};

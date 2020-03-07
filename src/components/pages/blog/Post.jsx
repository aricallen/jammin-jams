import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { Article } from '../../common/Article';
import { Section, Header1 } from '../../common/Structure';
import { fetchOne as fetchPost } from '../../../redux/posts/actions';
import { isResolved } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { spacing } from '../../../constants/style-guide';

const Wrapper = styled('div')``;

const HeroImageWrapper = styled('div')``;
const HeroImage = styled('img')`
  width: 100%;
`;

const ContentSection = styled(Section)`
  & > p {
    margin-top: ${spacing.double}px;
  }
  & > p:first-of-type {
    margin-top: 0;
  }
`;

const PostContent = ({ post, isBusy }) => {
  if (isBusy) {
    return <Spinner variant="large" />;
  }

  return (
    <Wrapper>
      <HeroImageWrapper>
        <HeroImage src="https://generative-placeholders.glitch.me/image?width=600&height=400" />
      </HeroImageWrapper>
      <Section>
        <Header1>{post?.title}</Header1>
      </Section>
      <ContentSection>
        <ReactMarkdown source={post?.content} escapeHtml={false} />
      </ContentSection>
    </Wrapper>
  );
};

export const Post = ({ match }) => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);
  const { postId } = match.params;

  const post = postsState.data.find((p) => p.id === +postId);
  const _fetchPost = () => {
    if (!post) {
      dispatch(fetchPost(postId));
    }
  };
  useEffect(_fetchPost, []);

  return (
    <Article Middle={() => <PostContent post={post} isBusy={!isResolved(postsState.meta)} />} />
  );
};

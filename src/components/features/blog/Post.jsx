import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { Article } from '../../common/Article';
import { Section, Header1 } from '../../common/Structure';
import { ArticleImage } from '../../common/ArticleImage';
import { fetchPostContent } from '../../../redux/posts/actions';
import * as MetaStatus from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { spacing } from '../../../constants/style-guide';
import { PostsNav } from './PostsNav';
import { SoundcloudPlayer } from '../../common/SoundcloudPlayer';

const Wrapper = styled('div')``;

const HeroImageWrapper = styled('div')``;

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
      <Header1 className="staatliches">#jamjourneys</Header1>
      <HeroImageWrapper>
        <ArticleImage upload={post.upload} />
      </HeroImageWrapper>
      <Section>
        <Header1>{post?.title}</Header1>
      </Section>
      <Section>
        {post.setLink && <SoundcloudPlayer setLink={post.setLink} title={post.title} />}
      </Section>
      <ContentSection>
        <ReactMarkdown source={post?.content} escapeHtml={false} />
      </ContentSection>
      <Section>
        <PostsNav currentPostId={post.id} />
      </Section>
    </Wrapper>
  );
};

export const Post = ({ match }) => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);
  const uploadsState = useSelector((state) => state.uploads);
  const { postId } = match.params;

  const post = postsState.data.find((p) => p.id === +postId);
  const upload = uploadsState.data.find((u) => u.id === post?.uploadsId);

  const _fetchPost = () => {
    if (!post) {
      dispatch(fetchPostContent(postId));
    }
  };
  useEffect(_fetchPost, []);

  // scroll to top so clicking posts nav links doesn't stay at bottom
  useLayoutEffect(() => {
    if (window.scollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, [postId]);

  return (
    <Article
      Middle={() => (
        <PostContent
          post={{ ...post, upload }}
          isBusy={!post && MetaStatus.isBusy(postsState.meta.one)}
        />
      )}
    />
  );
};

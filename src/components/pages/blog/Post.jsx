import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { Article } from '../../common/Article';
import { Section } from '../../common/Structure';

const Wrapper = styled('div')``;
const HeroImageWrapper = styled('div')``;
const HeroImage = styled('img')``;

const Content = ({ post }) => {
  return (
    <Wrapper>
      <HeroImageWrapper>
        <HeroImage src="https://generative-placeholders.glitch.me/image?width=600&height=400" />
      </HeroImageWrapper>
      <Section>
        <ReactMarkdown source={post.content} escapeHtml={false} />
      </Section>
    </Wrapper>
  );
};

export const Post = ({ post }) => {
  return <Article Middle={() => <Content post={post} />} />;
};

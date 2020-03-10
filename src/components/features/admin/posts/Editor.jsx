import React, { Fragment, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';
import { Input, TextArea } from '../../../common/Forms';
import { Section, Header2 } from '../../../common/Structure';
import { Button } from '../../../common/Button';
import { spacing, font } from '../../../../constants/style-guide';

const ContentWrapper = styled('div')`
  margin-top: ${spacing.double}px;
`;

export const Editor = ({ post, onChange }) => {
  const [isPreview, setIsPreview] = useState(false);
  return (
    <Fragment>
      <Section>
        <Header2>Title</Header2>
        <Input onChange={(e) => onChange({ ...post, title: e.target.value })} value={post.title} />
        <Header2>Soundcloud Link</Header2>
        <Input
          onChange={(e) => onChange({ ...post, setLink: e.target.value })}
          value={post.setLink}
        />
      </Section>
      <Section>
        <Header2>Content</Header2>
        <Button
          onClick={() => setIsPreview(!isPreview)}
          variant={isPreview ? 'primary' : 'secondary'}
        >
          Preview
        </Button>
        <ContentWrapper>
          {isPreview ? (
            <ReactMarkdown source={post.content} />
          ) : (
            <TextArea
              style={{
                fontSize: font.size.regular,
              }}
              rows={30}
              onChange={(e) => onChange({ ...post, content: e.target.value })}
              value={post.content}
            />
          )}
        </ContentWrapper>
      </Section>
    </Fragment>
  );
};

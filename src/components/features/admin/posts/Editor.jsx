import React, { Fragment, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';
import { Label, TextArea, FormInput, Fieldset } from '../../../common/Forms';
import { Section } from '../../../common/Structure';
import { Button } from '../../../common/Button';
import { ImagePicker } from '../uploads/ImagePicker';
import { spacing, font } from '../../../../constants/style-guide';

const ContentWrapper = styled('div')`
  margin-top: ${spacing.double}px;
`;

export const Editor = ({ post, onChange }) => {
  const [isPreview, setIsPreview] = useState(false);
  const handleChange = (name) => (event) => {
    onChange({ ...post, [name]: event.target.value });
  };

  return (
    <Fragment>
      <Section>
        <FormInput name="title" value={post.title} onChange={handleChange('title')} />
        <FormInput
          name="setLink"
          label="Soundcloud Link"
          value={post.setLink}
          onChange={handleChange('setLink')}
        />
        <Fieldset>
          <Label>Hero Image</Label>
          <ImagePicker
            onChange={(selectedOption) => onChange({ ...post, heroImgId: +selectedOption.value })}
            selectedId={post.heroImgId}
          />
        </Fieldset>
      </Section>
      <Section>
        <Label>Content</Label>
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
              onChange={handleChange('content')}
              value={post.content}
            />
          )}
        </ContentWrapper>
      </Section>
    </Fragment>
  );
};

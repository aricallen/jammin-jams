import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import { Label, TextArea, FormInput, Fieldset } from '../../../common/Forms';
import { Section } from '../../../common/Structure';
import { JJMarkdown } from '../../../common/JJMarkdown';
import { Button } from '../../../common/Button';
import { Select } from '../../../common/Select';
import { ImagePicker } from '../uploads/ImagePicker';
import { spacing } from '../../../../constants/style-guide';

const ContentWrapper = styled('div')`
  margin-top: ${spacing.double}px;
`;

const STATUS_OPTIONS = [
  {
    label: 'DRAFT',
    value: 'DRAFT',
  },
  {
    label: 'LIVE',
    value: 'LIVE',
  },
];

export const Editor = ({ post, onChange }) => {
  const [isPreview, setIsPreview] = useState(false);
  const selectedStatus = STATUS_OPTIONS.find((option) => option.value === post.status);

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
          value={post.setLink || ''}
          onChange={handleChange('setLink')}
        />
        <Fieldset>
          <Label>Excerpt (shows in previews and when sharing links)</Label>
          <TextArea
            name="excerpt"
            rows={3}
            value={post.excerpt || ''}
            onChange={handleChange('excerpt')}
          />
        </Fieldset>
        <Fieldset style={{ width: '50%' }}>
          <Label>Hero Image</Label>
          <ImagePicker
            onChange={(selectedOption) => onChange({ ...post, uploadsId: +selectedOption.value })}
            selectedId={post.uploadsId}
          />
        </Fieldset>
        <Fieldset style={{ width: '50%' }}>
          <Label>Live Status</Label>
          <Select
            name="status"
            options={STATUS_OPTIONS}
            value={selectedStatus}
            onChange={(selectedOption) => onChange({ ...post, status: selectedOption.value })}
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
            <JJMarkdown source={post.content} escapeHtml={false} />
          ) : (
            <TextArea rows={30} onChange={handleChange('content')} value={post.content || ''} />
          )}
        </ContentWrapper>
      </Section>
    </Fragment>
  );
};

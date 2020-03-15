import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Content } from '../../../common/Structure';
import { FormInput } from '../../../common/Forms';
import { spacing } from '../../../../constants/style-guide';

const FieldWrapper = styled('div')`
  margin-bottom: ${spacing.double}px;
`;

const descriptions = {
  filename: 'name of file minus the extension which is handled automatically',
  title: 'Human readable name for easy reference',
  caption: 'Text to display under photos in blog posts',
  altText: 'Text used by screen-readers',
};

export const EditForm = ({ values, onUpdate }) => {
  const handleChange = (name) => (event) => {
    onUpdate({ ...values, [name]: event.target.value });
  };

  const fields = Object.keys(values).filter(
    (field) => !['id', 'dateCreated', 'dateModified'].includes(field)
  );

  return (
    <Content>
      {fields.map((field) => (
        <FieldWrapper key={field}>
          <FormInput
            name={field}
            label={field}
            description={descriptions[field]}
            value={values[field] || ''}
            onChange={handleChange(field)}
          />
        </FieldWrapper>
      ))}
    </Content>
  );
};

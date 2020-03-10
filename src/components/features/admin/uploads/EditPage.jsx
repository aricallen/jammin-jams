import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { fetchOne, updateOne } from '../../../../redux/uploads/actions';
import { Spinner } from '../../../common/Spinner';
import { Content } from '../../../common/Structure';
import { UserMessage } from '../../../common/UserMessage';
import { Header } from '../Header';
import { Button } from '../../../common/Button';
import { FormInput } from '../../../common/Forms';
import { spacing } from '../../../../constants/style-guide';

const FieldWrapper = styled('div')`
  margin-bottom: ${spacing.double}px;
`;

const ImageWrapper = styled('div')`
  padding: ${spacing.double}px;
  display: flex;
  justify-content: center;
`;

const Image = styled('img')``;

const descriptions = {
  title: 'Human readable name for easy reference',
  caption: 'Text to display under photos in blog posts',
  altText: 'Text used by screen-readers',
};

const removeExtension = (filename) => {
  if (!filename) {
    return '';
  }
  const lastDot = filename.lastIndexOf('.');
  return filename.slice(0, lastDot);
};

const UploadEditForm = ({ record }) => {
  const [values, setValues] = useState(record || {});

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const fields = Object.keys(record).filter(
    (field) => !['id', 'filename', 'dateCreated', 'dateModified'].includes(field)
  );

  return (
    <Content>
      <FieldWrapper>
        <FormInput
          name="filename"
          label="Filename"
          description="name of file minus the extension which is handled automatically"
          value={removeExtension(record.filename)}
          onChange={handleChange('filename')}
        />
      </FieldWrapper>
      {fields.map((field) => (
        <FieldWrapper key={field}>
          <FormInput
            name={field}
            label={field}
            description={descriptions[field]}
            value={record[field] || ''}
            onChange={handleChange(field)}
          />
        </FieldWrapper>
      ))}
    </Content>
  );
};

export const EditPage = ({ match }) => {
  const dispatch = useDispatch();
  const uploadsState = useSelector((state) => state.uploads);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { uploadId } = match.params;
  const uploadRecord = uploadsState.data.find((record) => record.id === +uploadId);

  const fetchUpload = () => {
    if (!uploadRecord) {
      setIsFetching(false);
      dispatch(fetchOne(uploadId));
    }
  };
  useEffect(fetchUpload, []);

  const onSubmit = (values) => {
    setIsSubmitting(true);
    dispatch(updateOne(values));
  };

  if (isFetching) {
    return <Spinner variant="large" />;
  }

  if (!isFetching && !uploadRecord) {
    return (
      <UserMessage
        Message={() => 'Image not found...'}
        action={{ linkPath: '/uploads', text: 'Back to Uploads' }}
      />
    );
  }

  return (
    <Fragment>
      <Header
        title="Edit Upload"
        Controls={() => (
          <Button onClick={onSubmit} isBusy={isSubmitting}>
            Submit
          </Button>
        )}
      />
      <ImageWrapper>
        <Image src={`/assets/uploads/medium/${uploadRecord.filename}`} />
      </ImageWrapper>
      <UploadEditForm record={uploadRecord} onSubmit={onSubmit} />
    </Fragment>
  );
};

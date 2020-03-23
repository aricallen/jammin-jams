import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { fetchOne, updateOne, deleteOne } from '../../../../redux/uploads/actions';
import { Spinner } from '../../../common/Spinner';
import { UserMessage } from '../../../common/UserMessage';
import { Header } from '../Header';
import { Button } from '../../../common/Button';
import { ArticleImage } from '../../../common/ArticleImage';
import { spacing } from '../../../../constants/style-guide';
import { EditForm } from './EditForm';
import { parseExtension, withCleanFilename } from '../../../../utils/upload-helpers';

const ImageWrapper = styled('div')`
  padding: ${spacing.double}px;
  display: flex;
  justify-content: center;
`;

export const EditPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const uploadsState = useSelector((state) => state.uploads);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extension, setExtension] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { uploadId } = match.params;
  const uploadRecord = uploadsState.data.find((record) => record.id === +uploadId);
  const [values, setValues] = useState(null);

  const fetchUpload = () => {
    if (!uploadRecord) {
      dispatch(fetchOne(uploadId));
      setIsFetching(true);
    }
  };
  useEffect(fetchUpload, []);

  if (uploadRecord && isFetching === true) {
    setIsFetching(false);
  }

  // record loaded and values hasn't been set yet
  if (uploadRecord && values === null) {
    setValues(uploadRecord);
    setExtension(parseExtension(uploadRecord.filename));
  }

  const onUpdate = (newValues) => {
    setValues({ ...values, ...newValues });
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await dispatch(
      updateOne({
        ...values,
        filename: `${values.filename}.${extension}`,
      })
    );
    setIsSubmitting(false);
  };

  const onDelete = async () => {
    setIsDeleting(true);
    await dispatch(deleteOne(values.id));
    setIsDeleting(false);
    history.push('/admin/uploads');
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
          <Fragment>
            <Button onClick={onDelete} isBusy={isDeleting} variant="secondary">
              Delete
            </Button>
            <Button onClick={() => history.push('/admin/uploads')} variant="secondary">
              Back
            </Button>
            <Button onClick={onSubmit} isBusy={isSubmitting}>
              Submit
            </Button>
          </Fragment>
        )}
      />
      <ImageWrapper>
        <ArticleImage upload={{ ...values, filename: uploadRecord.filename }} />
      </ImageWrapper>
      <EditForm values={withCleanFilename(values)} onUpdate={onUpdate} />
    </Fragment>
  );
};

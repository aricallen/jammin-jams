import React, { useEffect, Fragment, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { isResolved } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { fetchMany, createMany } from '../../../redux/uploads/actions';
import { Section, Header1 } from '../../common/Structure';
import { Header } from './Header';
import { Button } from '../../common/Button';
import { UserMessage } from '../../common/UserMessage';
import { UploadItem } from './UploadItem';

const FileInput = styled('input')``;

const UploadsList = ({ uploads, inputRef }) => {
  if (uploads.length === 0) {
    return (
      <UserMessage
        Message={() => 'Nothing uploaded yet...'}
        action={{ text: 'Upload stuff', onClick: () => inputRef.current?.click() }}
      />
    );
  }

  return uploads.map((record) => <UploadItem key={record.id} item={record} />);
};

export const UploadsPage = () => {
  const dispatch = useDispatch();
  const uploadsState = useSelector((state) => state.uploads);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const inputRef = useRef();

  const fetch = () => {
    dispatch(fetchMany());
  };
  useEffect(fetch, []);

  const onClickUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i += 1) {
      formData.append('uploads', selectedFiles[i]);
    }
    dispatch(createMany(formData));
  };

  const onFilesSelected = (e) => {
    const { files } = e.target;
    setSelectedFiles(files);
  };

  const hasFiles = !!selectedFiles;

  if (!isResolved(uploadsState.meta.many)) {
    return <Spinner variant="large" />;
  }

  const uploadRecords = uploadsState.data.map((uploads) => ({
    ...uploads,
    onClick: () => history.push(`/admin/uploads/${uploads.id}`),
  }));

  return (
    <Fragment>
      <Header>
        <Header1>Uploads</Header1>
        <FileInput
          type="file"
          name="uploads"
          onChange={onFilesSelected}
          multiple={true}
          ref={inputRef}
        />
        {hasFiles && <Button onClick={onClickUpload}>Upload</Button>}
      </Header>
      <Section>
        <UploadsList uploads={uploadRecords} inputRef={inputRef} />
      </Section>
    </Fragment>
  );
};

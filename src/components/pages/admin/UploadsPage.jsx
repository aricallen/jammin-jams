import React, { useEffect, Fragment, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { isResolved, isBusy } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { fetchMany, createMany } from '../../../redux/uploads/actions';
import { Section, Header1 } from '../../common/Structure';
import { Header } from './Header';
import { Button } from '../../common/Button';
import { UserMessage } from '../../common/UserMessage';
import { UploadItem } from './UploadItem';
import { spacing } from '../../../constants/style-guide';

const FileInput = styled('input')``;

const Controls = styled('div')`
  display: flex;
  align-items: center;
  & > div {
    margin-left: ${spacing.double}px;
  }
`;

const UploadsList = ({ uploads, isUploading, inputRef }) => {
  if (uploads.length === 0) {
    return isUploading ? (
      <Spinner />
    ) : (
      <UserMessage
        Message={() => 'Nothing uploaded yet...'}
        action={{ text: 'Select files', onClick: () => inputRef.current?.click() }}
      />
    );
  }

  return uploads.map((record) => <UploadItem key={record.id} item={record} />);
};

export const UploadsPage = () => {
  const dispatch = useDispatch();
  const uploadsState = useSelector((state) => state.uploads);
  const [selectedFiles, setSelectedFiles] = useState([]);
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

  const hasFiles = selectedFiles.length > 0;

  if (!isResolved(uploadsState.meta.many)) {
    return <Spinner variant="large" />;
  }

  const uploadRecords = uploadsState.data.map((uploads) => ({
    ...uploads,
    onClick: () => history.push(`/admin/uploads/${uploads.id}`),
  }));

  const isUploading = isBusy(uploadsState.meta.many);

  return (
    <Fragment>
      <Header>
        <Header1>Uploads</Header1>
        <Controls>
          <FileInput
            type="file"
            name="uploads"
            onChange={onFilesSelected}
            multiple={true}
            ref={inputRef}
          />
          <Button onClick={onClickUpload} disabled={!hasFiles} isBusy={isUploading}>
            Upload
          </Button>
        </Controls>
      </Header>
      <Section>
        <UploadsList uploads={uploadRecords} inputRef={inputRef} isUploading={isUploading} />
      </Section>
    </Fragment>
  );
};

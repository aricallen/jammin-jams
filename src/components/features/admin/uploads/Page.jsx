import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { isResolved } from '../../../../utils/meta-status';
import { Spinner } from '../../../common/Spinner';
import { fetchMany, createMany } from '../../../../redux/uploads/actions';
import { Section } from '../../../common/Structure';
import { Header } from '../Header';
import { Button } from '../../../common/Button';
import { UserMessage } from '../../../common/UserMessage';
import { UploadItem } from './UploadItem';
import { DisableWrapper } from '../../../common/DisableWrapper';
import { spacing } from '../../../../constants/style-guide';

const FileInput = styled('input')``;

const Controls = styled('div')`
  display: flex;
  align-items: center;
  & > div {
    margin-left: ${spacing.double}px;
  }
`;

const ListWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;

const ItemWrapper = styled('div')`
  margin-right: ${spacing.double}px;
  margin-bottom: ${spacing.double}px;
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

  return (
    <ListWrapper>
      {uploads.map((record) => (
        <ItemWrapper key={record.id}>
          <UploadItem item={record} />
        </ItemWrapper>
      ))}
    </ListWrapper>
  );
};

export const Page = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const uploadsState = useSelector((state) => state.uploads);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
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
    setIsUploading(true);
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

  return (
    <DisableWrapper isDisabled={isUploading}>
      <Header
        title="Uploads"
        Controls={() => (
          <Controls>
            <FileInput
              type="file"
              name="uploads"
              onChange={onFilesSelected}
              multiple={true}
              ref={inputRef}
            />
            <Button onClick={onClickUpload} isDisabled={!hasFiles} isBusy={isUploading}>
              Upload
            </Button>
          </Controls>
        )}
      />
      <Section>
        <UploadsList uploads={uploadRecords} inputRef={inputRef} isUploading={isUploading} />
      </Section>
    </DisableWrapper>
  );
};

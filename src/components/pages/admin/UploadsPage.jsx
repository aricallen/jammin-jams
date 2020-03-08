import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { isResolved } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { fetchMany, createMany } from '../../../redux/uploads/actions';
import { Section, Header1 } from '../../common/Structure';
import { Header } from './Header';
// import { Input } from '../../common/Forms';
import { Button } from '../../common/Button';
// import { spacing, pallet, animation } from '../../../constants/style-guide';

const ItemWrapper = styled('div')``;
const Title = styled('div')``;
const Thumbnail = styled('div')``;
const Caption = styled('div')``;
const Form = styled('form')``;

const UploadItem = ({ item }) => {
  return (
    <ItemWrapper>
      <Title>{item.title}</Title>
      <Thumbnail src={item.path} />
      <Caption>{item.caption}</Caption>
    </ItemWrapper>
  );
};

export const UploadsPage = () => {
  const dispatch = useDispatch();
  const uploadsState = useSelector((state) => state.uploads);
  const [selectedFiles, setSelectedFiles] = useState(null);

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

  const uploadsRecords = uploadsState.data.map((uploads) => ({
    ...uploads,
    onSelect: () => history.push(`/admin/uploads/${uploads.id}`),
  }));
  return (
    <Fragment>
      <Header>
        <Header1>Uploads</Header1>
        <input type="file" name="uploads" onChange={onFilesSelected} multiple={true} />
        {hasFiles && <Button onClick={onClickUpload}>Upload</Button>}
      </Header>
      <Section>
        {uploadsRecords.map((uploadsItem) => (
          <UploadItem key={uploadsItem.id} uploadsItem={uploadsItem} />
        ))}
      </Section>
    </Fragment>
  );
};

import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { isResolved } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { fetchMany, createMany } from '../../../redux/media/actions';
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

const MediaItem = ({ item }) => {
  return (
    <ItemWrapper>
      <Title>{item.title}</Title>
      <Thumbnail src={item.path} />
      <Caption>{item.caption}</Caption>
    </ItemWrapper>
  );
};

export const MediaPage = () => {
  const dispatch = useDispatch();
  const mediaState = useSelector((state) => state.media);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const fetch = () => {
    dispatch(fetchMany());
  };
  useEffect(fetch, []);

  const onSubmitUpload = (e) => {
    e.preventDefault();
    // handle files manually
  };

  const onClickUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i += 1) {
      formData.append('file', selectedFiles[i]);
    }
    dispatch(createMany(formData));
  };

  const onFilesSelected = (e) => {
    const { files } = e.target;
    setSelectedFiles(files);
  };

  const hasFiles = !!selectedFiles;

  if (isResolved(mediaState.meta)) {
    const mediaRecords = mediaState.data.map((media) => ({
      ...media,
      onSelect: () => history.push(`/admin/media/${media.id}`),
    }));
    return (
      <Fragment>
        <Header>
          <Header1>Media</Header1>
          <Form onSubmit={onSubmitUpload}>
            {/* <Button onClick={onChooseFiles}>Choose Files</Button> */}
            <input type="file" name="media" onChange={onFilesSelected} multiple={true} />
            {hasFiles && <Button onClick={onClickUpload}>Upload</Button>}
          </Form>
        </Header>
        <Section>
          {mediaRecords.map((mediaItem) => (
            <MediaItem key={mediaItem.id} mediaItem={mediaItem} />
          ))}
        </Section>
      </Fragment>
    );
  }

  if (!isResolved(mediaState.meta)) {
    return <Spinner variant="large" />;
  }
};

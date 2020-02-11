import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { isResolved } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { fetchAllMedia } from '../../../redux/media/actions';
import { Section, Header1 } from '../../common/Structure';
import { Header } from './Header';
// import { Input } from '../../common/Forms';
import { Button } from '../../common/Button';
// import { spacing, pallet, animation } from '../../../constants/style-guide';

const ItemWrapper = styled('div')``;
const Title = styled('div')``;
const Thumbnail = styled('div')``;
const Caption = styled('div')``;

const MediaItem = ({ item }) => {
  return (
    <ItemWrapper>
      <Title>{item.title}</Title>
      <Thumbnail src={item.path} />
      <Caption>{item.captrion}</Caption>
    </ItemWrapper>
  );
};

export const MediaPage = () => {
  const dispatch = useDispatch();
  const mediaState = useSelector((state) => state.media);

  const fetch = () => {
    dispatch(fetchAllMedia());
  };
  useEffect(fetch, []);

  if (isResolved(mediaState.meta)) {
    const mediaItems = mediaState.data.map((media) => ({
      ...media,
      onSelect: () => history.push(`/admin/media/${media.id}`),
    }));
    return (
      <Fragment>
        <Header>
          <Header1>Media</Header1>
          <Button onClick={() => {}}>Upload</Button>
        </Header>
        <Section>
          {mediaItems.map((mediaItem) => (
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

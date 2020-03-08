import React from 'react';
import styled from '@emotion/styled';

const ItemWrapper = styled('div')``;
const Title = styled('div')``;
const Thumbnail = styled('img')``;
const Caption = styled('div')``;

export const UploadItem = ({ item }) => {
  const thumbnailSrc = `/uploads/small/${item.filename}`;

  return (
    <ItemWrapper onClick={item.onClick}>
      <Title>{item.title}</Title>
      <Thumbnail src={thumbnailSrc} />
      <Caption>{item.caption}</Caption>
    </ItemWrapper>
  );
};

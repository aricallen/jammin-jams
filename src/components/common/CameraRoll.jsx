import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { media } from '../../utils/media';
import { spacing } from '../../constants/style-guide';
import * as MetaStatus from '../../redux/utils/meta-status';
import { fetchMany } from '../../redux/camera-roll/actions';
import { Spinner } from './Spinner';

const ImageGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: ${spacing.triple * 10}px;
  ${media.mobile()} {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ImageWrapper = styled('div')`
  display: flex;
  ${media.mobile()} {
    max-width: 50%;
  }
`;

const Image = styled('img')``;

export const CameraRoll = () => {
  const dispatch = useDispatch();
  const cameraRollState = useSelector((state) => state.cameraRoll);

  const fetchLatest = () => {
    if (cameraRollState.data.length === 0) {
      dispatch(fetchMany());
    }
  };
  useEffect(fetchLatest, []);

  if (MetaStatus.isBusy(cameraRollState.meta)) {
    return (
      <ImageGrid>
        <Spinner />
      </ImageGrid>
    );
  }

  const urls = cameraRollState.data.slice(0, 6);

  return (
    <ImageGrid>
      {urls.map((src) => (
        <ImageWrapper key={src}>
          <Image src={src} />
        </ImageWrapper>
      ))}
    </ImageGrid>
  );
};

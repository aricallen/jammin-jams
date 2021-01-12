import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { media } from '../../utils/media';
import { spacing } from '../../constants/style-guide';
import * as MetaStatus from '../../utils/meta-status';
import { fetchMany } from '../../redux/camera-roll/actions';
import { Spinner } from './Spinner';

const FALLBACK_URLS = [
  'https://scontent-sjc3-1.xx.fbcdn.net/v/t51.2885-15/93819492_2626709847596825_2505830774362966048_n.jpg?_nc_cat=105&_nc_sid=8ae9d6&_nc_oc=AQnvwtD_S0FzmVos-lF192pGFNTWCZs3mEYUcIiMZXcY_cyVwXCkvIkAfJu-8HwVEiU&_nc_ht=scontent-sjc3-1.xx&oh=447d5300e1e89b97256495a556e7f27a&oe=5ECA03F8',
  'https://scontent-sjc3-1.xx.fbcdn.net/v/t51.2885-15/92322731_217294642837930_1769538798140791100_n.jpg?_nc_cat=109&_nc_sid=8ae9d6&_nc_oc=AQkhGgEgtilswOe-wgRLQQ3-fx46wY49xEuSjdhEdPwWk8XvvTFq8wCf4i1EvVOpGtg&_nc_ht=scontent-sjc3-1.xx&oh=6aaed5643318ea46cacd20f7167c6185&oe=5ECC530A',
  'https://scontent-sjc3-1.xx.fbcdn.net/v/t51.2885-15/90960576_226558115210134_7682306776396156721_n.jpg?_nc_cat=106&_nc_sid=8ae9d6&_nc_oc=AQmkYTmZbiU3TScZEzvyGXXuZTkGVq-XofaxcudxW8m5F-4M1uJbVVllBoS-gA3ecdQ&_nc_ht=scontent-sjc3-1.xx&oh=f132506e2f54c7132a2c7008829a203e&oe=5ECBA601',
  'https://scontent-sjc3-1.xx.fbcdn.net/v/t51.2885-15/90746205_2680963918801391_3530551394098961965_n.jpg?_nc_cat=101&_nc_sid=8ae9d6&_nc_oc=AQm_jH1wZZxjF03jQnp7maBexhphQRckIbzFnF3zjYtSMyUi2VHYnsH0Hr52bKiWgvE&_nc_ht=scontent-sjc3-1.xx&oh=ce497ed44585d1447cfd25b62d9054f3&oe=5ECB7C55',
  'https://scontent-sjc3-1.xx.fbcdn.net/v/t51.2885-15/88996230_181341546623415_5418047961083984720_n.jpg?_nc_cat=103&_nc_sid=8ae9d6&_nc_oc=AQnjlBdNy8Xi4JMD8dsc_KupnfKeQbBJNhlia8C5Fo7HaYJ0W7xDbugMYnnJ--1Py7U&_nc_ht=scontent-sjc3-1.xx&oh=01bd5a5c4507f40e40cba7bb39774177&oe=5ECB3B41',
  'https://scontent-sjc3-1.xx.fbcdn.net/v/t51.2885-15/84077831_630273530880048_1998945644995952757_n.jpg?_nc_cat=108&_nc_sid=8ae9d6&_nc_oc=AQnBzPqMFLWRamlgq_BfQ5xS85qxooMJEKNI6j2uiEXNNLWgAyqEBqBtztEDO134q9A&_nc_ht=scontent-sjc3-1.xx&oh=0aba8ac5f191095c278b7c7f24db9c3c&oe=5EC9C574',
];

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

const Image = styled('img')`
  object-fit: cover;
`;

const VideoElem = styled('video')`
  width: 100%;
  object-fit: cover;
`;

const Video = ({ src }) => {
  return <VideoElem src={src} autoPlay={true} loop={true} muted={true} />;
};

const getImgUrls = (cameraRollState) => {
  if (cameraRollState.meta.error) {
    return FALLBACK_URLS;
  }

  const urls = cameraRollState.data.slice(0, 6);
  return urls;
};

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

  const urls = getImgUrls(cameraRollState);

  return (
    <ImageGrid>
      {urls.map((src) => (
        <ImageWrapper key={src}>
          {src.includes('video') ? <Video src={src} /> : <Image src={src} />}
        </ImageWrapper>
      ))}
    </ImageGrid>
  );
};

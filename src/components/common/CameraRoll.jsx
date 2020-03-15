import React from 'react';
import styled from '@emotion/styled';
import { media } from '../../utils/media';

const SOURCES = [
  'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/84077831_630273530880048_1998945644995952757_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=sUQMWJLFQv8AX9VIgN1&oh=a9494a9efbc15a19240ff4d138f18c20&oe=5E8B7CA3',
  'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/83635923_172215234026512_7474879484230416756_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=3VIu_VYyjB8AX_04UQq&oh=35d67cf9b9bc3a5ff7e62eef479d7264&oe=5E82BE0A',
  'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/79874479_179325953463351_4529678117105805333_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=bVgUWan1wCsAX_WYXuq&oh=0a3f635f0779e79557c5ac3f39f965e3&oe=5E8052FF',
  'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/79242646_2343661465925418_8734881581469239403_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=lLTU-f6M6RsAX-9OJ_p&oh=12b0bb7b9f83f0e1f69f5c6f9ae7716f&oe=5E853E2B',
  'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/79535861_878833839200621_1233299700532854011_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=oiVNaa_AavwAX9S0-sj&oh=e3dc0461c474b8ddfc4d592aed3b50b6&oe=5E861B47',
  'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/75571718_577594742800686_6734023915968997397_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=_46PCaAa5UUAX9OaKM0&oh=5010d1604f3d1ac04008203546532762&oe=5E86C1FE',
];

const ImageGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  ${media.mobile()} {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled('div')`
  display: flex;
`;

const Image = styled('img')``;

export const CameraRoll = () => {
  return (
    <ImageGrid>
      {SOURCES.map((src) => (
        <ImageWrapper key={src}>
          <Image src={src} />
        </ImageWrapper>
      ))}
    </ImageGrid>
  );
};

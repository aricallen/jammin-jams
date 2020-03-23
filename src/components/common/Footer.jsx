import React from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';
import { sizes, pallet, spacing } from '../../constants/style-guide';
import { Emoji } from './Structure';
import { FollowUs } from './FollowUs';
import { media } from '../../utils/media';

const Wrapper = styled('div')`
  width: 100%;
  display: grid;
  min-height: ${sizes.rowHeight}px;
  padding: ${spacing.double}px;
  background-color: ${pallet.charcoal};
  color: white;
  grid-template-columns: repeat(3, 1fr);
  ${media.mobile()} {
    grid-template-columns: 1fr;
  }
`;

const Heart = styled(Emoji)`
  display: inline-block;
  padding: 0 ${spacing.regular}px;
`;

const Left = styled('div')``;
const Middle = styled('div')`
  align-self: center;
`;
const Right = styled('div')``;

const TagLine = styled('div')`
  margin-top: ${spacing.regular}px;
  display: flex;
  justify-content: center;
`;

export const Footer = withRouter((routeProps) => {
  if (routeProps.location.pathname.includes('admin')) {
    return null;
  }
  return (
    <Wrapper>
      <Left />
      <Middle>
        <TagLine>
          Made with&nbsp;<Heart label="heart">💜</Heart>&nbsp;in an Oakland kitchen.
        </TagLine>
      </Middle>
      <Right>
        <TagLine>Follow us around the interwebs!</TagLine>
        <TagLine>
          <FollowUs isInline={true} />
        </TagLine>
      </Right>
    </Wrapper>
  );
});

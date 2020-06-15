import React from 'react';
import styled from '@emotion/styled';
import { animation, pallet, spacing } from '../../constants/style-guide';
import InstagramIcon from '../../assets/icons/instagram.svg';
import MailIcon from '../../assets/icons/mail.svg';
import SoundcloudIcon from '../../assets/icons/soundcloud.svg';
import GithubIcon from '../../assets/icons/github.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';

const Wrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${(p) => (p.isInline ? '100%' : null)};
  & > a {
    margin-right: ${(p) => (p.isInline ? `${spacing.regular}px` : null)};
  }
  & > a:last-child {
    margin-right: 0;
  }
`;

const IconLink = styled('a')`
  svg circle,
  svg g.circle-fill {
    fill: ${pallet.blueberry};
    transition: fill ${animation};
  }

  &:hover {
    cursor: pointer;
    svg circle,
    svg g.circle-fill {
      fill: ${pallet.light.blueberry};
    }
  }
`;

export const FollowUs = (props) => {
  const { isInline = false } = props;
  return (
    <Wrapper isInline={isInline}>
      <IconLink target="_blank" href="https://www.instagram.com/jmnjamsoakland/">
        <InstagramIcon />
      </IconLink>
      <IconLink target="_blank" href="https://www.facebook.com/jmnjamsoakland/">
        <FacebookIcon />
      </IconLink>
      <IconLink target="_blank" href="https://github.com/aricallen/jmnjams">
        <GithubIcon />
      </IconLink>
      <IconLink target="_blank" href="https://soundcloud.com/jmnjams">
        <SoundcloudIcon />
      </IconLink>
      <IconLink target="_blank" href="mailto:jam@jmnjams.com">
        <MailIcon />
      </IconLink>
    </Wrapper>
  );
};

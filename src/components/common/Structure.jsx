import React from 'react';
import styled from '@emotion/styled';
import { spacing, font, sizes } from '../../constants/style-guide';
import { fontSizes } from '../../utils/style-helpers';
import { media } from '../../utils/media';

export const Content = styled('div')`
  width: 100%;
  padding: ${spacing.quadruple}px;
  ${fontSizes('regular')}
`;

export const FullPageWrapper = styled('div')`
  margin: 0 auto;
  width: 64%;
  max-width: ${sizes.tabletWidth}px;
  ${media.mobile()} {
    width: 100%;
    padding: 0 ${spacing.double}px;
  }
`;

export const Header1 = styled('h1')`
  margin-bottom: ${spacing.regular}px;
  ${media.mobile()} {
    margin-bottom: ${spacing.triple}px;
  }
  ${fontSizes('header1')}
  font-weight: ${font.weight.bold};
`;

export const Header2 = styled('h2')`
  margin-bottom: ${spacing.regular}px;
  ${media.mobile()} {
    margin-bottom: ${spacing.triple}px;
  }
  ${fontSizes('header2')}
`;

export const Section = styled('section')`
  margin-top: ${spacing.double}px;
  ${fontSizes('regular')}
`;

export const Paragraph = styled('p')`
  margin-top: ${spacing.double}px;
  ${fontSizes('regular')}
`;

export const Emphasis = styled('span')`
  font-style: italic;
  font-weight: ${font.weight.semiBold};
`;

export const OrderedList = styled('ol')`
  padding-left: ${spacing.regular * 5}px;
`;

export const UnorderedList = styled('ul')``;

export const ListItem = styled('li')`
  padding-left: ${spacing.regular}px;
`;

export const Emoji = ({ label, children }) => {
  return <span aria-label={label}>{children}</span>;
};

/**
 * @usage set position relative to direct parent and place as first child
 * then all children inside will be overlayed the parent and aligned in the middle
 */
export const Overlay = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MobileOnly = styled('div')`
  display: none;
  ${media.mobile()} {
    display: initial;
  }
`;

export const DesktopOnly = styled('div')`
  ${media.mobile()} {
    display: none;
  }
`;

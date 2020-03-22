import React from 'react';
import styled from '@emotion/styled';
import { spacing, animation, pallet, font } from '../../constants/style-guide';
import { fontSizes } from '../../utils/style-helpers';
import { media } from '../../utils/media';

export const Content = styled('div')`
  width: 100%;
  padding: ${spacing.quadruple}px;
  ${fontSizes('regular')}
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
  padding-left: ${spacing.double}px;
`;

export const Emoji = ({ label, children }) => {
  return <span aria-label={label}>{children}</span>;
};

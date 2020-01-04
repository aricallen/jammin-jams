import React from 'react';
import Color from 'color';
import styled from '@emotion/styled';
import { spacing, animation, pallet } from '../../constants/style-guide';
import { fontSizes } from '../../utils/style-helpers';

export const Content = styled('div')`
  width: 100%;
  padding: ${spacing.quadruple}px;
  ${fontSizes('regular')}
`;

export const Header1 = styled('h1')`
  margin-top: ${spacing.regular}px;
  margin-bottom: ${spacing.regular}px;
  ${fontSizes('header1')}
`;

export const Header2 = styled('h2')`
  margin-top: ${spacing.regular}px;
  margin-bottom: ${spacing.regular}px;
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
  font-weight: bold;
`;

export const Link = styled('a')`
  text-decoration: none;
  transition: color ${animation};
  color: ${pallet.strawberry};

  &:active,
  &:visited {
    color: ${Color(pallet.strawberry)
      .darken(0.2)
      .toString()};
  }

  &:hover {
    color: ${Color(pallet.strawberry)
      .lighten(0.2)
      .toString()};
  }
`;

export const Emoji = ({ label, children }) => {
  return <span aria-label={label}>{children}</span>;
};

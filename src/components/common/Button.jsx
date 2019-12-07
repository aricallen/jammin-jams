import React from 'react';
import styled from '@emotion/styled';
import { spacing, pallet, font } from '../../constants/style-guide';

export const Button = styled('button')`
  cursor: pointer;
  padding: ${spacing.regular}px;
  background-color: ${pallet.strawberry};
  border-radius: ${spacing.regular}px;
  font-size: ${font.size.regular}px;
  font-weight: ${font.weight.bold};

  &:active,
  &:focus,
  &:focus-within,
  &:hover {
    outline: none;
    box-shadow: 0 0 4px ${pallet.strawberry};
  }
`;

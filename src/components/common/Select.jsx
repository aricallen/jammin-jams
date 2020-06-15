import React from 'react';
import styled from '@emotion/styled';
import { omit } from 'lodash';
import ReactSelect from 'react-select';
import Color from 'color';
import { spacing, pallet, basePallet } from '../../constants/style-guide';

export const SelectElem = styled(ReactSelect)`
  border-radius: ${spacing.regular}px;
  border-color: ${pallet.sky};
  width: 100%;
  &:active,
  &:focus,
  &:focus-within,
  &:hover {
    outline: none;
    box-shadow: 0 0 4px ${pallet.sky};
  }
  .react-select__control,
  .react-select__control:active,
  .react-select__control:focus,
  .react-select__control:focus-within,
  .react-select__control:hover {
    outline: none;
    border-radius: ${spacing.regular}px;
    border-color: ${pallet.sky};
  }
  .react-select__control:active,
  .react-select__control:focus,
  .react-select__control:focus-within {
    box-shadow: 0 0 4px ${pallet.sky};
  }
  .react-select__option--is-selected {
    background-color: ${Color(basePallet.sky)
      .lighten(0.2)
      .toString()};
  }
  .react-select__option--is-selected:hover {
    background-color: ${Color(basePallet.sky)
      .lighten(0.4)
      .toString()};
  }
  .react-select__option:hover,
  .react-select__option--is-focused {
    background-color: ${pallet.sky};
  }

  .react-select__single-value {
    overflow: visible;
  }
`;

export const Select = (props) => {
  const otherProps = omit(props, ['required']);
  return <SelectElem {...otherProps} classNamePrefix="react-select" />;
};

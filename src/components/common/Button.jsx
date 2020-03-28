import React, { useRef } from 'react';
import Color from 'color';
import { omit } from 'lodash';
import styled from '@emotion/styled';
import { spacing, pallet, font } from '../../constants/style-guide';
import { Spinner } from './Spinner';

const getBackgroundColor = (props) => {
  const { variant = 'primary', disabled = false } = props;

  if (disabled && variant === 'primary') {
    return pallet.light.strawberry;
  }

  if (disabled && variant === 'secondary') {
    return Color(pallet.charcoal)
      .alpha(0.05)
      .toString();
  }

  if (variant === 'secondary') {
    return 'white';
  }

  return pallet.strawberry;
};

const ButtonElem = styled('button')`
  cursor: pointer;
  padding: ${spacing.regular}px;
  background-color: ${getBackgroundColor};
  border-radius: ${spacing.regular}px;
  font-size: 1em;
  font-weight: ${font.weight.medium};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(p) => (p.variant === 'secondary' ? pallet.strawberry : 'white')};

  &:active,
  &:focus,
  &:focus-within,
  &:hover {
    outline: none;
    box-shadow: 0 0 4px ${pallet.strawberry};
  }
`;

const SpinnerWrapper = styled('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled('span')`
  opacity: ${(p) => (p.isHidden ? 0 : 1)};
`;

export const Button = (props) => {
  const { children, isBusy } = props;
  const buttonProps = omit(props, ['children', 'isBusy']);
  const buttonRef = useRef();
  const width = buttonRef.current && buttonRef.current.width;
  const height = buttonRef.current && buttonRef.current.height;
  return (
    <ButtonElem ref={buttonRef} {...buttonProps}>
      {isBusy ? (
        <SpinnerWrapper width={width} height={height}>
          <Spinner fill="white" variant="small" />
        </SpinnerWrapper>
      ) : null}
      <TextWrapper isHidden={isBusy}>{children}</TextWrapper>
    </ButtonElem>
  );
};

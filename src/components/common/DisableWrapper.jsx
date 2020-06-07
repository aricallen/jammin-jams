import React from 'react';
import Color from 'color';
import styled from '@emotion/styled';
import { basePallet } from '../../constants/style-guide';

const Wrapper = styled('div')``;

const Overlay = styled('div')`
  position: relative;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${Color(basePallet.charcoal)
    .alpha(0.1)
    .toString()};
  pointer-events: none;
`;

export const DisableWrapper = ({ children, isDisabled = false }) => {
  if (isDisabled === false) {
    return children;
  }

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Wrapper onClick={onClick}>
      <Overlay>{children}</Overlay>
    </Wrapper>
  );
};

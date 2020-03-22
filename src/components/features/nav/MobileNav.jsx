import React, { useState } from 'react';
import styled from '@emotion/styled';
import { spacing, animation } from '../../../constants/style-guide';

const ToggleBar = styled('div')`
  width: 100%;
  margin-top: ${spacing.regular / 2}px;
  min-height: 4px;
  background-color: white;
  transition: all ${animation};
`;

const ToggleButton = styled('div')`
  cursor: pointer;
  width: ${spacing.quadruple}px;
  &.is-expanded {
    .toggle-bar {
      width: 110%;
    }

    .toggle-bar:first-of-type {
      transform: rotate(40deg) translate(3px, 5px);
    }

    .toggle-bar:nth-of-type(2) {
      opacity: 0;
    }

    .toggle-bar:last-of-type {
      transform: rotate(-40deg) translate(5px, -9px);
    }
  }
`;

export const MobileNav = ({ navItems }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ToggleButton
      className={isExpanded ? 'is-expanded' : 'is-collapsed'}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <ToggleBar className="toggle-bar" />
      <ToggleBar className="toggle-bar" />
      <ToggleBar className="toggle-bar" />
    </ToggleButton>
  );
};

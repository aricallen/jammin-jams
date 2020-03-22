import React, { Fragment, useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { spacing, animation, sizes, pallet } from '../../../constants/style-guide';
import { NavLink, NavItem as BaseNavItem, NavList as NavListWrapper } from './Nav';
import { expandSection, collapseSection } from '../../../utils/expandable-helpers';

const NavItem = styled(BaseNavItem)`
  display: block;
  padding: ${spacing.regular}px ${spacing.double}px;
  border-bottom: 1px solid white;
  &:last-of-type {
    border-bottom: none;
  }
`;

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

const NavList = ({ navItems }) => {
  return (
    <NavListWrapper>
      {navItems?.map((item) => (
        <NavItem key={item.path}>
          <NavLink
            to={item.path}
            activeStyle={{
              color: 'white',
            }}
          >
            {item.text}
          </NavLink>
        </NavItem>
      ))}
    </NavListWrapper>
  );
};

// hacked to shift left outside of nav bars padding
const ExpandableWrapper = styled('div')`
  position: absolute;
  top: ${sizes.rowHeight}px;
  width: 100%;
  background-color: ${pallet.strawberry};
  margin-left: -32px;
  z-index: 10;
  transition: height ${animation};

  height: 0px;
  border-bottom: ${(p) => (p.isExpanded ? '1px solid white' : 'none')};
  overflow: ${(p) => (p.isExpanded ? 'auto' : 'hidden')};
`;

const ExpandableList = ({ isExpanded, navItems, portalRef }) => {
  const wrapperRef = useRef();

  const handleExpandedChange = () => {
    if (isExpanded) {
      // isExpanded changed to true
      expandSection(wrapperRef.current);
    } else {
      // isExpanded changed to false
      collapseSection(wrapperRef.current);
    }
  };

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      handleExpandedChange();
    }
  }, [isExpanded]);

  const Elem = () => (
    <ExpandableWrapper
      ref={wrapperRef}
      isExpanded={isExpanded}
      height={wrapperRef.current?.scrollHeight}
    >
      <NavList navItems={navItems} />
    </ExpandableWrapper>
  );

  // render into MobileListPortal to take up whole width
  if (portalRef.current) {
    return createPortal(<Elem />, portalRef.current);
  }
  return null;
};

export const MobileNav = ({ navItems, portalRef }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Fragment>
      <ToggleButton className={isExpanded ? 'is-expanded' : 'is-collapsed'} onClick={onClick}>
        <ToggleBar className="toggle-bar" />
        <ToggleBar className="toggle-bar" />
        <ToggleBar className="toggle-bar" />
      </ToggleButton>
      <ExpandableList isExpanded={isExpanded} portalRef={portalRef} navItems={navItems} />
    </Fragment>
  );
};

import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { sizes, pallet, spacing, animation } from '../../constants/style-guide';

const Wrapper = styled('nav')`
  display: flex;
  align-items: center;
  min-height: ${sizes.rowHeight}px;
  background-color: ${pallet.blueberry};
  padding-left: ${spacing.quadruple}px;
  padding-right: ${spacing.quadruple}px;
`;

const Brand = styled('div')`
  flex-grow: 1;
`;

const NavList = styled('ul')`
  list-style: none;
`;

const NavItem = styled('li')`
  margin-left: ${spacing.double}px;
  display: inline-block;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  transition: color ${animation};

  &:active {
    color: black;
  }

  &:hover {
    color: ${pallet.strawberry};
  }
`;

const navItems = [
  {
    text: 'About',
    path: '/about',
  },
  {
    text: 'Store',
    path: '/store',
  },
];

export const NavBar = () => {
  return (
    <Wrapper>
      <Brand>Jammin&apos; Jams</Brand>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path}>
            <NavLink to={item.path}>{item.text}</NavLink>
          </NavItem>
        ))}
      </NavList>
    </Wrapper>
  );
};

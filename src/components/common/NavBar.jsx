import React from 'react';
import styled from '@emotion/styled';
import { NavLink as BaseNavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { sizes, pallet, spacing, animation, font } from '../../constants/style-guide';
import { fontSizes } from '../../utils/style-helpers';

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
  ${fontSizes('largest')}
  font-weight: ${font.weight.black};
  cursor: pointer;
`;

const BrandLinkWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const NavLogo = styled(Logo)`
  width: ${spacing.triple * 2}px;
  height: ${spacing.triple * 2}px;
  margin-right: ${spacing.double}px;
`;

const NavList = styled('ul')`
  list-style: none;
`;

const NavItem = styled('li')`
  margin-left: ${spacing.double}px;
  display: inline-block;
  ${fontSizes('large')}
`;

const NavLink = styled(BaseNavLink)`
  text-decoration: none;
  color: black;
  transition: color ${animation};

  &:active {
    color: black;
  }

  &:hover {
    color: ${pallet.strawberry};
  }
`;

const navItems = [
  // {
  //   text: 'About',
  //   path: '/about',
  // },
  {
    text: 'Store',
    path: '/store',
  },
  {
    text: 'Sign In',
    path: '/log-in',
  },
];

export const NavBar = () => {
  return (
    <Wrapper>
      <Brand>
        <NavLink to="/">
          <BrandLinkWrapper>
            <NavLogo />
            Jammin&apos; Jams
          </BrandLinkWrapper>
        </NavLink>
      </Brand>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path}>
            <NavLink
              to={item.path}
              activeStyle={{
                color: pallet.charcoal,
              }}
            >
              {item.text}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </Wrapper>
  );
};

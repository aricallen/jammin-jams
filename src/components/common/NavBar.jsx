import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as BaseNavLink, withRouter } from 'react-router-dom';
import { Logo } from './Logo';
import { sizes, pallet, spacing, animation, font } from '../../constants/style-guide';
import { fontSizes } from '../../utils/style-helpers';
import { isInitial } from '../../redux/utils/meta-status';
import { fetchSession } from '../../redux/session/actions';
import CartIcon from '../../assets/icons/shopping_cart.svg';

const Wrapper = styled('nav')`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 10;
  align-items: center;
  justify-content: space-between;
  min-height: ${sizes.rowHeight}px;
  background-color: ${pallet.blueberry};
  padding-left: ${spacing.quadruple}px;
  padding-right: ${spacing.quadruple}px;
`;

const BarSection = styled('div')`
  display: flex;
  align-items: center;
`;

const Brand = styled('span')`
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
  position: relative;
  ${fontSizes('large')}
  .sub-nav {
    display: none;
  }
  &:hover {
    .sub-nav {
      display: initial;
    }
  }
`;

const SubNav = styled('nav')`
  position: absolute;
  top: ${spacing.quadruple}px;
  left: 0;
  display: block;
  background: ${pallet.light.blueberry};
  width: max-content;
  & > li {
    padding: ${spacing.regular}px;
    margin-left: 0;
    display: block;
    border-bottom: 1px solid white;
  }
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

const IconWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin-left: ${spacing.double}px;
  cursor: pointer;

  svg {
    transition: fill ${animation};
  }

  &:hover {
    svg {
      fill: ${pallet.strawberry};
    }
  }
`;

const ABOUT_ITEMS = [
  {
    text: 'How It Works',
    path: '/about/how-it-works',
  },
  {
    text: 'FAQs',
    path: '/about/faqs',
  },
  {
    text: 'Delivery Calendar',
    path: '/about/delivery-calendar',
  },
];

const NAV_ITEMS = [
  {
    text: 'About',
    path: '/about',
    children: ABOUT_ITEMS,
  },
  {
    text: 'Store',
    path: '/store',
  },
];

const LOGGED_IN_ITEMS = [
  {
    text: 'Sign out',
    path: '/account/sign-out',
  },
];

const LOGGED_OUT_ITEMS = [
  {
    text: 'Sign In',
    path: '/account/sign-in',
  },
];

const getNavItems = (navItems, sessionState) => {
  if (sessionState.data.user) {
    return [...navItems, ...LOGGED_IN_ITEMS];
  }
  return [...navItems, ...LOGGED_OUT_ITEMS];
};

const renderNavItem = (item) => (
  <NavItem key={item.path}>
    <NavLink
      to={item.path}
      activeStyle={{
        color: pallet.light.strawberry,
      }}
    >
      {item.text}
    </NavLink>
    {item.children ? <SubNav className="sub-nav">{item.children.map(renderNavItem)}</SubNav> : null}
  </NavItem>
);

export const NavBar = withRouter(({ history }) => {
  const sessionState = useSelector((state) => state.session);
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();

  const fetch = () => {
    if (isInitial(sessionState.meta)) {
      dispatch(fetchSession());
    }
  };
  useEffect(fetch, []);

  const navItems = getNavItems(NAV_ITEMS, sessionState);

  return (
    <Wrapper>
      <BarSection>
        <Brand>
          <NavLink to="/">
            <BrandLinkWrapper>
              <NavLogo />
              Jammin&apos; Jams
            </BrandLinkWrapper>
          </NavLink>
        </Brand>
      </BarSection>
      <BarSection>
        <NavList>{navItems.map(renderNavItem)}</NavList>
        {cart.length > 0 && (
          <IconWrapper onClick={() => history.push('/store/checkout')}>
            <CartIcon />
          </IconWrapper>
        )}
      </BarSection>
    </Wrapper>
  );
});

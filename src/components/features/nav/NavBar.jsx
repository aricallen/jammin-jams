import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sizes, pallet, spacing } from '../../../constants/style-guide';
import { isInitial } from '../../../redux/utils/meta-status';
import { fetchSession } from '../../../redux/session/actions';
import CartIcon from '../../../assets/icons/shopping_cart.svg';
import { DesktopOnly, MobileOnly } from '../../common/Structure';
import { isBetaTester } from '../../../utils/beta-testing';
import { MobileNav } from './MobileNav';
import {
  NavLogo,
  NavList,
  NavLink,
  NavItem,
  SubNav,
  Brand,
  BrandLinkWrapper,
  IconWrapper,
} from './Nav';

// first column is mobile nav list
const Wrapper = styled('nav')`
  display: grid;
  grid-template-columns: 0px 3fr 1fr 3fr;
  position: sticky;
  top: 0;
  z-index: 10;
  align-items: center;
  min-height: ${sizes.rowHeight}px;
  background-color: ${pallet.strawberry};
  padding-left: ${spacing.quadruple}px;
  padding-right: ${spacing.quadruple}px;
`;

const BarSection = styled('div')`
  display: flex;
  align-items: center;
`;

const MobileWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const MobileListPortal = styled('div')``;

const NAV_ITEMS = [
  {
    text: 'How It Works',
    path: '/about/how-it-works',
  },
  {
    text: 'FAQs',
    path: '/about/faqs',
  },
  {
    text: 'Store',
    path: '/store',
  },
];

const LOGGED_IN_ITEMS = [
  {
    text: 'Account',
    path: '/account/orders',
  },
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
  if (!isBetaTester()) {
    return [];
  }
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
        color: 'white',
      }}
    >
      {item.text}
    </NavLink>
    {item.children ? <SubNav className="sub-nav">{item.children.map(renderNavItem)}</SubNav> : null}
  </NavItem>
);

const Cart = withRouter(({ cart, history }) => {
  if (cart.length === 0) {
    return null;
  }

  return (
    <IconWrapper onClick={() => history.push('/store/checkout')}>
      <CartIcon />
    </IconWrapper>
  );
});

export const NavBar = () => {
  const sessionState = useSelector((state) => state.session);
  const cart = useSelector((state) => state.cart.data);
  const portalRef = useRef();
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
      <MobileListPortal ref={portalRef} />
      <BarSection>
        <Brand>
          <NavLink to="/">
            <BrandLinkWrapper className="fjalla">Jammin&apos; Jams</BrandLinkWrapper>
          </NavLink>
        </Brand>
      </BarSection>
      <BarSection style={{ justifyContent: 'center' }}>
        <NavLogo />
      </BarSection>
      <BarSection style={{ justifyContent: 'flex-end' }}>
        {/* desktop nav */}
        <DesktopOnly>
          <NavList>
            {navItems.map(renderNavItem)}
            <NavItem style={{ marginLeft: 0 }}>
              <Cart cart={cart} />
            </NavItem>
          </NavList>
        </DesktopOnly>

        {/* mobile nav */}
        <MobileOnly>
          <MobileWrapper>
            <NavItem>
              <Cart cart={cart} />
            </NavItem>
            <MobileNav navItems={navItems} portalRef={portalRef} />
          </MobileWrapper>
        </MobileOnly>
      </BarSection>
    </Wrapper>
  );
};

import styled from '@emotion/styled';
import { NavLink as BaseNavLink } from 'react-router-dom';
import { Logo } from '../../common/Logo';
import { pallet, spacing, animation, font } from '../../../constants/style-guide';
import { fontSizes } from '../../../utils/style-helpers';

export const Brand = styled('span')`
  ${fontSizes('largest')}
  font-weight: ${font.weight.black};
  cursor: pointer;
`;

export const BrandLinkWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const NavLogo = styled(Logo)`
  width: ${spacing.triple}px;
  height: ${spacing.triple}px;
`;

export const NavList = styled('ul')`
  list-style: none;
`;

export const NavItem = styled('li')`
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

export const SubNav = styled('nav')`
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

export const NavLink = styled(BaseNavLink)`
  text-decoration: none;
  color: black;
  transition: color ${animation};

  &:active {
    color: black;
  }

  &:hover {
    color: white;
  }
`;

export const IconWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin-left: ${spacing.double}px;
  cursor: pointer;

  svg {
    transition: fill ${animation};
  }

  &:hover {
    svg {
      fill: white;
    }
  }
`;

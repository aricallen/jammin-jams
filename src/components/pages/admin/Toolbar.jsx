import React from 'react';
import styled from '@emotion/styled';
import { pallet, animation, spacing, font } from '../../../constants/style-guide';
import DashboardIcon from '../../../assets/icons/dashboard.svg';
import PostsIcon from '../../../assets/icons/web.svg';
import BuildIcon from '../../../assets/icons/build.svg';

const Wrapper = styled('div')`
  height: 100%;
  width: 100%;
  background-color: ${pallet.charcoal};
  color: white;
`;

const ItemBlock = styled('div')`
  height: ${spacing.quadruple * 2}px;
  width: 100%;
  text-align: center;
  padding: ${spacing.regular}px;
  margin-bottom: ${spacing.double}px;
  font-size: ${font.size.small}px;

  color: ${(p) => (p.isActive ? pallet.light.strawberry : 'white')};
  background-color: ${(p) => (p.isActive ? pallet.light.charcoal : 'initial')};

  transition: background-color ${animation}, color ${animation};

  svg {
    transition: fill ${animation};
    fill: ${(p) => (p.isActive ? pallet.light.strawberry : 'white')};
  }

  &:hover {
    cursor: pointer;
    color: ${pallet.strawberry};
    background-color: ${pallet.light.charcoal};
    svg {
      fill: ${pallet.strawberry};
    }
  }
`;

const ItemIcon = styled('div')``;
const ItemText = styled('div')``;

const TOOLBAR_ITEMS = [
  {
    text: 'Dashboard',
    Icon: DashboardIcon,
    path: '/admin/dashboard',
  },
  {
    text: 'Logo Builder',
    Icon: BuildIcon,
    path: '/admin/logo-builder',
  },
  {
    text: 'Posts',
    Icon: PostsIcon,
    path: '/admin/posts',
  },
];

const ToolbarItem = ({ item }) => {
  const { Icon, onSelect, isActive } = item;
  return (
    <ItemBlock onClick={onSelect} isActive={isActive}>
      <ItemIcon>
        <Icon />
      </ItemIcon>
      <ItemText>{item.text}</ItemText>
    </ItemBlock>
  );
};

export const Toolbar = ({ history, location }) => {
  const onSelect = (item) => {
    history.push(item.path);
  };

  const items = TOOLBAR_ITEMS.map((item) => ({
    ...item,
    onSelect: () => onSelect(item),
    isActive: item.path === location.pathname,
  }));

  return (
    <Wrapper>
      {items.map((item) => (
        <ToolbarItem key={item.path} item={item} />
      ))}
    </Wrapper>
  );
};

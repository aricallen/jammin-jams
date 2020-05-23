import React from 'react';
import styled from '@emotion/styled';
import { pallet, animation, spacing, font, sizes } from '../../../constants/style-guide';
import DashboardIcon from '../../../assets/icons/dashboard.svg';
import PostsIcon from '../../../assets/icons/web.svg';
import BuildIcon from '../../../assets/icons/build.svg';
import QrCode from '../../../assets/icons/memory.svg';
import WallpaperIcon from '../../../assets/icons/wallpaper.svg';
import AlertIcon from '../../../assets/icons/announcement.svg';

const Wrapper = styled('div')`
  height: 100%;
  width: 100%;
  background-color: ${pallet.charcoal};
  color: white;
  padding-top: ${spacing.regular}px;
`;

const ItemBlock = styled('div')`
  min-height: ${sizes.rowHeight}px;
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
    text: 'Posts',
    Icon: PostsIcon,
    path: '/admin/posts',
  },
  {
    text: 'Uploads',
    Icon: WallpaperIcon,
    path: '/admin/uploads',
  },
  {
    text: 'Logo Builder',
    Icon: BuildIcon,
    path: '/admin/logo-builder',
  },
  {
    text: 'Qr Codes',
    Icon: QrCode,
    path: '/admin/qr-codes',
  },
  {
    text: 'Alerts',
    Icon: AlertIcon,
    path: '/admin/alerts',
  },
  {
    text: 'Page Meta',
    Icon: AlertIcon,
    path: '/admin/pages',
  },
];

const SidebarItem = ({ item }) => {
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

export const Sidebar = ({ history, location }) => {
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
        <SidebarItem key={item.path} item={item} />
      ))}
    </Wrapper>
  );
};

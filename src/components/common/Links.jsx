import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { pallet, animation } from '../../constants/style-guide';
import { Button } from './Button';

/**
 * overrides global 'a' styled
 */
export const UnstyledLink = styled(Link)`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

/**
 * looks and behaves like a link but is a span
 * used for when a link-like text is a part of larger link
 * e.g. blurbs -> Read More
 */
export const LinkLikeSpan = styled('span')`
  cursor: pointer;
  color: ${pallet.strawberry};
  text-decoration: none;
  transition: color ${animation};
  &:hover {
    color: ${pallet.light.strawberry};
  }
`;

export const DisabledLink = styled(LinkLikeSpan)`
  cursor: default;
  color: ${pallet.light.strawberry};
`;

export const ButtonLink = (props) => {
  const { to, ...buttonProps } = props;
  return (
    <Link to={to} style={{ display: 'inline-block' }}>
      <Button {...buttonProps} />
    </Link>
  );
};

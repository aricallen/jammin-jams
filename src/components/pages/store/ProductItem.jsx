import React, { useState } from 'react';
import styled from '@emotion/styled';
import { spacing, font, pallet } from '../../../constants/style-guide';
import { Button as BaseButton } from '../../common/Button';
import { media } from '../../../utils/media';

const Wrapper = styled('div')`
  max-width: 25%;
  ${media.mobile()} {
    max-width: 50%;
  }
  padding: ${spacing.quadruple}px;
  text-align: center;
`;

const Picture = styled('img')``;

const ItemContent = styled('div')``;

const Name = styled('div')``;

const Button = styled(BaseButton)`
  width: 100%;
`;

export const ProductItem = (props) => {
  const { onSelect, product, isInCart } = props;

  return (
    <Wrapper>
      <Picture src="https://via.placeholder.com/400" />
      <ItemContent>
        <Name>{product.name}</Name>
      </ItemContent>
      <Button disabled={isInCart} onClick={() => onSelect(product)}>
        Subscribe
      </Button>
    </Wrapper>
  );
};

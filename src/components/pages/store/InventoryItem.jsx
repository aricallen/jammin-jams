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

const Price = styled('div')``;

const Amount = styled('span')`
  font-weight: ${font.weight.semiBold};
`;

const Button = styled(BaseButton)`
  width: 100%;
`;

export const InventoryItem = (props) => {
  const { onSelect, inventoryItem, isInCart } = props;

  return (
    <Wrapper>
      <Picture src="https://via.placeholder.com/200" />
      <ItemContent>
        <Name>{inventoryItem.name}</Name>
        <Price>
          Price: <Amount>${inventoryItem.price}</Amount>
        </Price>
      </ItemContent>
      <Button disabled={isInCart} onClick={() => onSelect(inventoryItem)}>
        Add to Cart
      </Button>
    </Wrapper>
  );
};

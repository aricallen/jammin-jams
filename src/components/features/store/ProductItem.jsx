import styled from '@emotion/styled';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { font, spacing } from '../../../constants/style-guide';
import { formatAmount } from '../../../utils/format-helpers';
import { media } from '../../../utils/media';
import { Button as BaseButton, Select } from '../../common';
import { ProductPicture } from './ProductPicture';

const Wrapper = styled('div')`
  padding: ${spacing.quadruple}px;
  padding-top: 0;
  width: 30%;
  ${media.mobile()} {
    max-width: 80%;
  }
`;

const ItemContentWrapper = styled('div')``;

const Price = styled('div')`
  text-align: center;
  font-size: ${font.size.largest}px;
`;

const Value = styled('div')`
  width: 50%;
`;

const Row = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: ${spacing.double}px;
`;

const Label = styled('div')`
  width: 50%;
  margin-right: ${spacing.half}px;
`;

const ActionWrapper = styled('div')`
  margin-top: ${spacing.double}px;
`;

const Button = styled(BaseButton)`
  width: 100%;
  opacity: ${(p) => (p.isInCart ? 0.6 : 1)};
`;

const ActionButton = (props) => {
  const { isInCart, onAddItem, product, isSoldOut, selectedQty } = props;
  const text = isSoldOut ? 'Sold out' : isInCart ? 'Update quantity' : 'Add to cart';
  const onClick = isSoldOut ? null : onAddItem;
  return (
    <Button isDisabled={isSoldOut} onClick={() => onClick({ product, selectedQty })}>
      {text}
    </Button>
  );
};

const createOptions = (product, isJotm) => {
  if (isJotm) {
    return [
      { value: 0, label: 0 },
      { value: 1, label: 1 },
    ];
  }

  if (product.quantity === 0) {
    return [];
  }

  const options = [];
  for (let i = 0; i <= product.quantity; i += 1) {
    options.push({
      value: i,
      label: i,
    });
  }
  return options;
};

const ItemContent = (props) => {
  const { product, onSelectQty, selectedQty, isJotm, isSoldOut } = props;
  return (
    <ItemContentWrapper>
      <Row>
        <Price>${formatAmount(product.price)}</Price>
      </Row>
      <Row>
        <Label>Quantity: </Label>
        <Value>
          <Select
            style={{ width: '50%' }}
            options={createOptions(product, isJotm)}
            value={{ value: selectedQty, label: selectedQty }}
            onChange={onSelectQty}
            isDisabled={isSoldOut}
            isSearchable={false}
          />
        </Value>
      </Row>
    </ItemContentWrapper>
  );
};

const Product = (props) => {
  const { product, imageSrc, onSelectQty, isSoldOut, selectedQty, isJotm } = props;

  return (
    <Fragment>
      <ProductPicture imageSrc={imageSrc} />
      <ItemContent
        product={product}
        onSelectQty={onSelectQty}
        selectedQty={selectedQty}
        isJotm={isJotm}
        isSoldOut={isSoldOut}
      />
      <ActionWrapper>
        <ActionButton {...props} isSoldOut={isSoldOut} />
      </ActionWrapper>
    </Fragment>
  );
};

export const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart.data);
  const { product } = props;
  const isJotm = product.name.toLowerCase().includes('subscription');
  const inventoryCount = product.quantity;
  const isSoldOut = inventoryCount === 0;
  const [selectedQty, setSelectedQty] = useState(isSoldOut ? 0 : 1);

  const isInCart = cart.find((item) => item.product.id === product.id);

  const imageSrc = product.images?.[0] || '/assets/images/jotm.jpeg';

  const onSelectQty = (option) => {
    const quantity = +option.value;
    setSelectedQty(quantity);
  };

  return (
    <Wrapper>
      <Product
        {...props}
        product={product}
        isSoldOut={isSoldOut}
        imageSrc={imageSrc}
        isInCart={isInCart}
        isJotm={isJotm}
        onSelectQty={onSelectQty}
        selectedQty={selectedQty}
      />
    </Wrapper>
  );
};

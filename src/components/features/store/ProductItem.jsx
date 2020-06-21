import React, { useState, Fragment } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { spacing, font } from '../../../constants/style-guide';
import { Button as BaseButton, Spinner, Select } from '../../common';
import { isResolved, isBusy } from '../../../utils/meta-status';
import { media } from '../../../utils/media';
import { formatAmount } from '../../../utils/format-helpers';
import { ProductPicture } from './ProductPicture';

const Wrapper = styled('div')`
  padding: ${spacing.quadruple}px;
  width: 30%;
  ${media.mobile()} {
    max-width: 80%;
  }
`;

const ItemContent = styled('div')``;

const Price = styled('div')`
  text-align: center;
  font-size: ${font.size.largest}px;
`;

const Name = styled(Price)``;

const Value = styled('div')`
  width: 50%;
`;

const Row = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.regular}px;
`;

const NameRow = styled(Row)`
  justify-content: center;
  margin: ${spacing.double}px 0;
  font-weight: ${font.weight.bold};
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
  const text =
    isInCart || selectedQty === 0 ? 'Update quantity' : isSoldOut ? 'Sold out' : 'Add to cart';
  const onClick = isSoldOut ? null : onAddItem;
  return (
    <Button isDisabled={isSoldOut} onClick={() => onClick({ product, selectedQty })}>
      {text}
    </Button>
  );
};

const JotmItem = (props) => {
  const [selectedSkuOption, setSelectedSkuOption] = useState(null);
  const { onAddItem, onRemoveItem, product, skusOptions, isInCart, imageSrc } = props;

  return (
    <Fragment>
      <ProductPicture imageSrc={imageSrc} />
      <ItemContent>
        <Label>{product.name}</Label>
      </ItemContent>
      <Select
        onChange={setSelectedSkuOption}
        options={skusOptions}
        value={selectedSkuOption}
        placeholder="Subscription Interval..."
        isSearchable={false}
      />
      <ActionWrapper>
        {isInCart ? (
          <Button
            onClick={() => onRemoveItem({ product, sku: selectedSkuOption?.sku })}
            isInCart={true}
          >
            Remove from cart
          </Button>
        ) : (
          <Button onClick={() => onAddItem({ product, sku: selectedSkuOption?.sku })}>
            Add to cart
          </Button>
        )}
      </ActionWrapper>
    </Fragment>
  );
};

const createOptions = (availableQty) => {
  if (availableQty === 0) {
    return [];
  }

  const options = [];
  // include 0 as option
  for (let i = 0; i <= availableQty; i += 1) {
    options.push({
      value: i,
      label: i,
    });
  }
  return options;
};

const Product = (props) => {
  const { product, imageSrc, onSelectQty, isSoldOut, selectedQty } = props;

  return (
    <Fragment>
      <ProductPicture imageSrc={imageSrc} />
      <ItemContent>
        <NameRow>
          <Name>{product.name}</Name>
        </NameRow>
        <Row>
          <Price>${formatAmount(product.price)}</Price>
        </Row>
        <Row>
          <Label>Quantity: </Label>
          <Value>
            <Select
              style={{ width: '50%' }}
              options={createOptions(product.quantity, selectedQty)}
              value={{ value: selectedQty, label: selectedQty }}
              onChange={onSelectQty}
            />
          </Value>
        </Row>
      </ItemContent>
      <ActionWrapper>
        <ActionButton {...props} isSoldOut={isSoldOut} />
      </ActionWrapper>
    </Fragment>
  );
};

export const ProductItem = (props) => {
  const skusState = useSelector((state) => state.skus);
  const cart = useSelector((state) => state.cart.data);
  const { product } = props;
  const inventoryCount = product.quantity;
  const isSoldOut = inventoryCount === 0;
  const [selectedQty, setSelectedQty] = useState(isSoldOut ? 0 : 1);

  const skusOptions = skusState.data
    .filter((sku) => sku.product === product.id)
    .map((sku) => ({
      label: `${sku.attributes.interval} -- $${formatAmount(sku.price)}`,
      value: sku.id,
      sku,
    }));

  const isSubscription = isResolved(skusState.meta) && skusOptions.length > 0;
  const isInCart = cart.find((item) => item.product.id === product.id);

  const imageSrc = product.images?.[0] || '/assets/images/jotm.jpeg';

  if (isBusy(skusState.meta)) {
    return <Spinner />;
  }

  const onSelectQty = (option) => {
    const quantity = +option.value;
    setSelectedQty(quantity);
  };

  return (
    <Wrapper>
      {isSubscription ? (
        <JotmItem {...props} imageSrc={imageSrc} isInCart={isInCart} />
      ) : (
        <Product
          {...props}
          product={product}
          isSoldOut={isSoldOut}
          imageSrc={imageSrc}
          isInCart={isInCart}
          onSelectQty={onSelectQty}
          selectedQty={selectedQty}
        />
      )}
    </Wrapper>
  );
};

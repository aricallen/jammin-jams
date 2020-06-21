import React, { useState, Fragment } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { spacing, font } from '../../../constants/style-guide';
import { Button as BaseButton } from '../../common/Button';
import { Select } from '../../common/Select';
import { Spinner } from '../../common/Spinner';
import { isResolved, isBusy } from '../../../utils/meta-status';
import { media } from '../../../utils/media';
import { formatAmount } from '../../../utils/format-helpers';

const Wrapper = styled('div')`
  padding: ${spacing.quadruple}px;
  max-width: 30%;
  ${media.mobile()} {
    max-width: 80%;
  }
`;

const Picture = styled('img')``;

const ItemContent = styled('div')``;

const Label = styled('div')`
  text-align: center;
  font-size: ${font.size.large}px;
  padding: ${spacing.regular}px;
`;

const ActionWrapper = styled('div')`
  margin-top: ${spacing.double}px;
`;

const Button = styled(BaseButton)`
  width: 100%;
  opacity: ${(p) => (p.isInCart ? 0.6 : 1)};
`;

const ActionButton = (props) => {
  const { isInCart, onAddItem, onRemoveItem, product } = props;
  const text = isInCart ? 'Remove from cart' : product.quantity === 0 ? 'Sold out' : 'Add to cart';
  const isDisabled = product.quantity === 0;
  const onClick = isInCart ? onRemoveItem : isDisabled ? null : onAddItem;
  return (
    <Button isDisabled={isDisabled} onClick={() => onClick({ product })}>
      {text}
    </Button>
  );
};

const JotmItem = (props) => {
  const [selectedSkuOption, setSelectedSkuOption] = useState(null);
  const { onAddItem, onRemoveItem, product, skusOptions, isInCart, imageSrc } = props;

  return (
    <Fragment>
      <Picture src={imageSrc} />
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

const Product = (props) => {
  const { onAddItem, onRemoveItem, product, isInCart, imageSrc } = props;

  return (
    <Fragment>
      <Picture src={imageSrc} />
      <ItemContent>
        <Label>{product.name}</Label>
        <Label>${formatAmount(product.price)}</Label>
      </ItemContent>
      <ActionWrapper>
        <ActionButton {...props} />
      </ActionWrapper>
    </Fragment>
  );
};

export const ProductItem = (props) => {
  const skusState = useSelector((state) => state.skus);
  const cart = useSelector((state) => state.cart.data);
  const { product } = props;

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

  return (
    <Wrapper>
      {isSubscription ? (
        <JotmItem {...props} imageSrc={imageSrc} isInCart={isInCart} />
      ) : (
        <Product {...props} imageSrc={imageSrc} isInCart={isInCart} />
      )}
    </Wrapper>
  );
};

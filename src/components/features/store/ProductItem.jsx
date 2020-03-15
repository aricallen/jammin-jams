import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { spacing, font } from '../../../constants/style-guide';
import { Button as BaseButton } from '../../common/Button';
import { Select } from '../../common/Select';
import { Spinner } from '../../common/Spinner';
import { isResolved, isBusy } from '../../../redux/utils/meta-status';

const Wrapper = styled('div')`
  padding: ${spacing.quadruple}px;
`;

const Picture = styled('img')``;

const ItemContent = styled('div')``;

const Name = styled('div')`
  text-align: center;
  font-size: ${font.size.large}px;
  padding: ${spacing.regular}px;
`;

const SubscribeWrapper = styled('div')`
  margin-top: ${spacing.double}px;
`;

const Button = styled(BaseButton)`
  width: 100%;
`;

export const ProductItem = (props) => {
  const [selectedSkuOption, setSelectedSkuOption] = useState(null);
  const skusState = useSelector((state) => state.skus);
  const cart = useSelector((state) => state.cart.data);
  const { onAddItem, onRemoveItem, product } = props;

  const skusOptions = skusState.data
    .filter((sku) => sku.product === product.id)
    .map((sku) => ({
      label: sku.attributes.interval,
      value: sku.id,
      sku,
    }));

  const isSubscription = isResolved(skusState.meta) && skusOptions.length > 0;
  const isInCart = cart.find((item) => item.product.id === product.id);

  return (
    <Wrapper>
      <Picture src="https://via.placeholder.com/400" />
      <ItemContent>
        <Name>{product.name}</Name>
      </ItemContent>
      {isSubscription ? (
        <Select
          onChange={setSelectedSkuOption}
          options={skusOptions}
          value={selectedSkuOption}
          placeholder="Subscription Interval..."
          isSearchable={false}
        />
      ) : (
        isBusy(skusState.meta) && <Spinner />
      )}
      {selectedSkuOption && (
        <SubscribeWrapper>
          {isInCart ? (
            <Button onClick={() => onRemoveItem({ product, sku: selectedSkuOption.sku })}>
              Remove from cart
            </Button>
          ) : (
            <Button onClick={() => onAddItem({ product, sku: selectedSkuOption.sku })}>
              Add to cart
            </Button>
          )}
        </SubscribeWrapper>
      )}
    </Wrapper>
  );
};

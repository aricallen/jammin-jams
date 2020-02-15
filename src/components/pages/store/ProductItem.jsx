import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { spacing, font } from '../../../constants/style-guide';
import { Button as BaseButton } from '../../common/Button';
import { Select } from '../../common/Select';
import { Spinner } from '../../common/Spinner';
import { media } from '../../../utils/media';
import { isResolved, isBusy } from '../../../redux/utils/meta-status';

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

const Name = styled('div')`
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
  const [interval, setInterval] = useState(null);
  const plansState = useSelector((state) => state.plans);
  const { onSelect, product, isInCart } = props;

  const planOptions = plansState.data
    .filter((plan) => plan.product === product.id)
    .map((plan) => ({
      label: plan.nickname,
      value: plan.id,
    }));

  const isSubscription = isResolved(plansState.meta) && planOptions.length > 0;

  return (
    <Wrapper>
      <Picture src="https://via.placeholder.com/400" />
      <ItemContent>
        <Name>{product.name}</Name>
      </ItemContent>
      {isSubscription ? (
        <Select onChange={setInterval} options={planOptions} value={interval} />
      ) : (
        isBusy(plansState.meta) && <Spinner />
      )}
      {interval && (
        <SubscribeWrapper>
          <Button disabled={isInCart} onClick={() => onSelect(product)}>
            Subscribe
          </Button>
        </SubscribeWrapper>
      )}
    </Wrapper>
  );
};

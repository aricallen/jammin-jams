import React from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { sum } from 'lodash';
import { Content } from '../../common/Structure';
import { Button as BaseButton } from '../../common/Button';
import { spacing, border, font } from '../../../constants/style-guide';
import { removeFromCart } from '../../../redux/cart/actions';
import { formatAmount } from '../../../utils/format-helpers';
import { boxShadow } from '../../../utils/style-helpers';

const Wrapper = styled('div')`
  box-shadow: ${boxShadow()};
  width: 100%;
`;

const Footer = styled(Content)`
  display: flex;
`;

const Row = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.double}px;
  border-bottom: ${border};
  text-break: space;
`;

const Button = styled(BaseButton)`
  width: 100%;
`;

const Rows = styled('div')``;
const Title = styled('div')``;
const Action = styled('div')``;
const ItemInfo = styled('div')``;

const TotalWrapper = styled('div')`
  border-top: ${border};
  padding: ${spacing.regular}px;
  text-align: right;
`;

const TotalRow = styled('div')`
  margin-top: ${spacing.regular}px;
`;

const Label = styled('span')`
  font-weight: ${font.weight.bold};
  margin-right: ${spacing.regular}px;
`;

const Price = styled('span')``;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { product, sku } = item;
  const title = `${product.name} - ${sku.attributes.interval.replace(/-/g, '')}`;

  const onClick = () => {
    dispatch(removeFromCart(item));
  };

  return (
    <Row>
      <ItemInfo>
        <Title>{title}</Title>
        <Price>
          <Label>Price:</Label> ${formatAmount(item.sku.price)}
        </Price>
      </ItemInfo>
      <Action>
        <Button variant="secondary" onClick={onClick}>
          X
        </Button>
      </Action>
    </Row>
  );
};

export const CartPreview = ({ onCheckout }) => {
  const cart = useSelector((state) => state.cart.data);
  const coupons = useSelector((state) => state.coupons.data);

  if (cart.length === 0) {
    return null;
  }

  const totalDiscount = sum(
    coupons.filter((coupon) => coupon.metadata.type === 'price').map((coupon) => coupon.amountOff)
  );
  const totalAmount = sum(cart.map((item) => item.sku.price)) - totalDiscount;

  return (
    <Wrapper>
      <Rows>
        {cart.map((item) => (
          <CartItem item={item} key={item.product.id} />
        ))}
        <TotalWrapper>
          <TotalRow>
            <Label>Discount: </Label>
            <Price>${formatAmount(totalDiscount)}</Price>
          </TotalRow>
          <TotalRow>
            <Label>Total: </Label>
            <Price>${formatAmount(totalAmount)}</Price>
          </TotalRow>
        </TotalWrapper>
      </Rows>
      {onCheckout && (
        <Footer>
          <Button onClick={onCheckout}>Checkout</Button>
        </Footer>
      )}
    </Wrapper>
  );
};

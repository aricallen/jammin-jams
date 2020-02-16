import React from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { Content } from '../../common/Structure';
import { Button as BaseButton } from '../../common/Button';
import { boxShadow, spacing, border } from '../../../constants/style-guide';
import { media } from '../../../utils/media';
import { removeFromCart } from '../../../redux/cart/actions';

const Wrapper = styled('div')`
  ${media.mobile()} {
    display: none;
  }
  box-shadow: ${boxShadow};
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
`;

const Button = styled(BaseButton)`
  width: 100%;
`;

const Rows = styled('div')``;
const Title = styled('div')``;
const Action = styled('div')``;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { product, sku } = item;
  const title = `${product.name} - ${sku.attributes.interval}`;

  const onClick = () => {
    dispatch(removeFromCart(item));
  };

  return (
    <Row>
      <Title>{title}</Title>
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
  if (cart.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <Rows>
        {cart.map((item) => (
          <CartItem item={item} key={item.product.id} />
        ))}
      </Rows>
      <Footer>
        <Button onClick={onCheckout}>Checkout</Button>
      </Footer>
    </Wrapper>
  );
};

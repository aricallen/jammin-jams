import React from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { sum } from 'lodash';
import { Content } from '../../common/Structure';
import { Button as BaseButton } from '../../common/Button';
import { spacing, border, font, pallet } from '../../../constants/style-guide';
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

const Description = styled('div')`
  color: ${pallet.textAlt};
`;

const LabelRow = styled('div')``;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { product, selectedQty } = item;

  const onClick = () => {
    dispatch(removeFromCart(item));
  };

  return (
    <Row>
      <ItemInfo>
        <Title>{product.name}</Title>
        {product.description && <Description>{product.description}</Description>}
        <LabelRow>
          <Label>Price:</Label> ${formatAmount(product.price)}
        </LabelRow>
        <LabelRow>
          <Label>Quantity:</Label> {selectedQty || 1}
        </LabelRow>
      </ItemInfo>
      <Action>
        <Button variant="secondary" onClick={onClick}>
          X
        </Button>
      </Action>
    </Row>
  );
};

const getAmountOff = (coupon, price, qty) => {
  if (!coupon) {
    return 0;
  }
  if (coupon.amountOff) {
    return coupon.amountOff / qty;
  }
  return (coupon.percentOff / 100) * price;
};

export const CartPreview = ({ onCheckout }) => {
  const cart = useSelector((state) => state.cart.data);
  const coupons = useSelector((state) => state.coupons.data);

  if (cart.length === 0) {
    return null;
  }

  const coupon = coupons.find((c) => c.metadata.type === 'price');
  const totalQty = sum(cart.map(({ selectedQty }) => selectedQty));
  const updatedCart = cart.map(({ product, selectedQty }) => {
    const amountOff = getAmountOff(coupon, product.price, totalQty);
    const discountedPrice = product.price - amountOff;
    return {
      product: {
        ...product,
        price: discountedPrice,
      },
      selectedQty,
    };
  });

  const totalAmount = sum(
    updatedCart.map(({ product, selectedQty }) => product.price * selectedQty)
  );

  return (
    <Wrapper>
      <Rows>
        {updatedCart.map((item) => (
          <CartItem item={item} key={item.product.id} />
        ))}
        <TotalWrapper>
          {/* {coupon && (
            <TotalRow>
              <Label>Discount: </Label>
              <Label>${formatAmount(totalDiscount)}</Label>
            </TotalRow>
          )} */}
          <TotalRow>
            <Label>Total: </Label>
            <Label>${formatAmount(totalAmount)}</Label>
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

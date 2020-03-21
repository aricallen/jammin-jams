import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { sum } from 'lodash';
import { isResolved, isErrored, isInitial } from '../../../redux/utils/meta-status';
import { fetchCoupon } from '../../../redux/coupons/actions';
import { formatAmount } from '../../../utils/format-helpers';
import { CouponCodeForm } from './CouponCodeForm';

const Wrapper = styled('div')``;

const Message = styled('div')``;

export const Payment = (props) => {
  const checkoutSessionState = useSelector((state) => state.checkoutSession);
  const cart = useSelector((state) => state.cart.data);
  const couponsState = useSelector((state) => state.coupons);
  const dispatch = useDispatch();

  const { values, setIsValid } = props;
  const { couponCode } = values;

  const foundCoupon = couponsState.data.find((coupon) => coupon.name === couponCode);
  const preDiscountAmount = sum(cart.map((item) => item.sku.price));
  const discount = foundCoupon ? foundCoupon.amountOff : 0;
  const totalAmount = preDiscountAmount - discount;

  // has entered a code and validated as a real coupon
  const isEmptyCouponCode = couponCode === undefined || couponCode.length === 0;
  setIsValid(isEmptyCouponCode || foundCoupon);

  const onApplyCoupon = (e) => {
    e.preventDefault();
    dispatch(fetchCoupon(values.couponCode, 'price'));
  };

  if (isInitial(checkoutSessionState.meta)) {
    return (
      <Wrapper>
        <Message>
          Jammin&apos; Jams{' '}
          <em>
            <b>never collects or stores any payment information directly</b>
          </em>{' '}
          . We use Stripe as our payment service. Visit{' '}
          <a
            href="https://stripe.com/docs/security/stripe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe security
          </a>{' '}
          to learn more. You will be charged with a one time payment of{' '}
          <b>${formatAmount(totalAmount)}</b> which also covers the cost of your first order. We
          will then charge you for every subsequent order. Confirmation emails will be sent every
          step of the way. 😊
        </Message>
        <CouponCodeForm
          {...props}
          couponsState={couponsState}
          onApply={onApplyCoupon}
          fieldName="couponCode"
          couponType="price"
        />
      </Wrapper>
    );
  }

  if (isResolved(checkoutSessionState.meta)) {
    const { sessionKey, id: sessionId } = checkoutSessionState.data;
    const stripe = window.Stripe(sessionKey);
    window.setTimeout(() => {
      stripe.redirectToCheckout({ sessionId });
    }, 1500);
  }

  if (isErrored(checkoutSessionState.meta)) {
    return <Message>{checkoutSessionState.meta.error.message}</Message>;
  }

  return <Message>Redirecting you to payment service...</Message>;
};

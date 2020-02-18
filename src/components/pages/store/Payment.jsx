import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { sum } from 'lodash';
import { isResolved, isErrored, isInitial } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { spacing } from '../../../constants/style-guide';
import { formatAmount } from '../../../utils/format-helpers';

const Message = styled('div')`
  padding: ${spacing.double}px;
`;

export const Payment = (props) => {
  const checkoutSessionState = useSelector((state) => state.checkoutSession);
  const cart = useSelector((state) => state.cart.data);

  const { setIsValid } = props;

  const totalAmount = sum(cart.map((item) => item.sku.price));

  setIsValid(true);

  if (isInitial(checkoutSessionState.meta)) {
    return (
      <Message>
        Jammin&apos; Jams{' '}
        <em>
          <b>never collects or stores any payment information directly</b>
        </em>{' '}
        . We use Stripe as our payment service. Visit{' '}
        <a href="https://stripe.com/docs/security/stripe" target="_blank" rel="noopener noreferrer">
          Stripe security
        </a>{' '}
        to learn more. You will be charged with a one time payment of{' '}
        <b>${formatAmount(totalAmount)}</b> which also covers the cost of your first order. We will
        then charge you for every subsequent order. Confirmation emails will be sent every step of
        the way. 😊
      </Message>
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

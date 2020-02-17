import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { submitCheckout } from '../../../redux/checkout-session/actions';
import { isResolved, isErrored } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { spacing } from '../../../constants/style-guide';

const Message = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing.double}px;
`;

export const Payment = (props) => {
  const dispatch = useDispatch();
  const checkoutSessionState = useSelector((state) => state.checkoutSession);

  const { values } = props;

  useEffect(() => {
    dispatch(submitCheckout(values));
  }, []);

  if (isResolved(checkoutSessionState.meta)) {
    const { sessionKey, id: sessionId } = checkoutSessionState.data;
    const stripe = window.Stripe(sessionKey);
    window.setTimeout(() => {
      stripe.redirectToCheckout({ sessionId });
    }, 1000);
    return <Message>Redirecting you to payment service...</Message>;
  }
  if (isErrored(checkoutSessionState.meta)) {
    return <Message>{checkoutSessionState.meta.error}</Message>;
  }
  return <Spinner />;
};

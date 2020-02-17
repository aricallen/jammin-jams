import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Content, Header2 } from '../../common/Structure';
import { isResolved, isErrored, isBusy, isInitial } from '../../../redux/utils/meta-status';
import { createOne } from '../../../redux/users/actions';
import { Spinner } from '../../common/Spinner';
import { boxShadow, spacing } from '../../../constants/style-guide';
import { fetchSession } from '../../../redux/session/actions';
import { updateOne } from '../../../redux/checkout-session/actions';

const Wrapper = styled('div')`
  box-shadow: ${boxShadow};
`;

const Item = styled('div')`
  padding: ${spacing.double}px;
`;
const Label = styled('span')`
  font-weight: bold;
`;

const Value = styled('span')``;
const Name = styled('div')``;
const Amount = styled('div')``;
const Description = styled('div')``;

const formatAmount = (amount) => {
  const fractional = amount / 100;
  return fractional.toFixed(2);
};

const ReceiptItem = ({ item }) => {
  return (
    <Item>
      <Name>
        <Label>Product: </Label>
        <Value>{item.custom.name}</Value>
      </Name>
      <Description>
        <Label>Description: </Label>
        <Value>{item.custom.description}</Value>
      </Description>
      <Amount>
        <Label>Total: </Label>
        <Value>{formatAmount(item.amount)}</Value>
      </Amount>
    </Item>
  );
};

/**
 * upon completion of checkout, create customer in local db and link the records
 */
export const Success = ({ location }) => {
  const sessionState = useSelector((state) => state.session);
  const usersState = useSelector((state) => state.users);
  const checkoutSessionState = useSelector((state) => state.checkoutSession);
  const dispatch = useDispatch();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const checkoutData = sessionState.data[sessionId];

  const _updateSession = () => {
    if (checkoutData) {
      dispatch(updateOne(checkoutData.formValues, sessionId));
    }
  };

  const _createUser = () => {
    if (isResolved(checkoutSessionState.meta)) {
      const { customer: customerId } = checkoutSessionState.data;
      const { username, password } = checkoutData.formValues;
      dispatch(createOne({ username, password, userRolesId: 2, paymentCustomerId: customerId }));
    }
  };

  const _fetchSession = () => {
    if (!isInitial(sessionState.meta)) {
      dispatch(fetchSession());
    }
  };

  useEffect(_fetchSession, []);
  useEffect(_updateSession, [checkoutData]);
  useEffect(_createUser, [isResolved(checkoutSessionState.meta)]);

  const _isBusy =
    !isResolved(sessionState.meta) || isBusy(usersState.meta) || isBusy(checkoutSessionState.meta);

  if (_isBusy) {
    return <Spinner variant="large" />;
  }

  if (isResolved(sessionState.meta) && !checkoutData) {
    return <Redirect to="/store" />;
  }

  if (isErrored(sessionState.meta) || isErrored(usersState.meta)) {
    console.error(sessionState.meta.error);
  }

  // show receipt
  return (
    <Wrapper>
      <Content>
        <Header2>Your order has been processed successfully.</Header2>
        {checkoutData.display_items.map((item) => (
          <ReceiptItem item={item} key={item.custom.description} />
        ))}
      </Content>
    </Wrapper>
  );
};

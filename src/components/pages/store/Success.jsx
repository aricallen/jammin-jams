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
import { addMember } from '../../../redux/email/actions';
import { ErrorPage } from '../ErrorPage';

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
const ConfNumber = styled('div')`
  margin-bottom: ${spacing.regular}px;
`;
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
      <ConfNumber>
        <Label>Confirmation #: </Label>
        <Value>{item.id}</Value>
      </ConfNumber>
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
  const emailState = useSelector((state) => state.email);
  const dispatch = useDispatch();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const checkoutData = sessionState.data[sessionId];

  // get session data from server
  const _fetchSession = () => {
    if (!isInitial(sessionState.meta)) {
      dispatch(fetchSession());
    }
  };

  // update new customer with shipping info
  const _updateSession = () => {
    if (checkoutData) {
      dispatch(updateOne(checkoutData.formValues, sessionId));
    }
  };

  // create local user with payment id
  const _createUser = () => {
    if (isResolved(checkoutSessionState.meta)) {
      const { customer: customerId } = checkoutSessionState.data;
      const { email, password } = checkoutData.formValues;
      dispatch(createOne({ email, password, userRolesId: 2, paymentCustomerId: customerId }));
    }
  };

  // add member to subscribers list and optionally to newsletter list
  const _addMember = () => {
    if (isResolved(usersState.meta)) {
      const { email, firstName, lastName, newsletterSignup } = checkoutData.formValues;
      const tags = ['Subscriber', ...[newsletterSignup && 'Newsletter']];
      dispatch(addMember({ email, firstName, lastName, tags }));
    }
  };

  useEffect(_fetchSession, []);
  useEffect(_updateSession, [checkoutData]);
  useEffect(_createUser, [isResolved(checkoutSessionState.meta)]);
  useEffect(_addMember, [isResolved(usersState.meta)]);

  const allStates = [sessionState, usersState, checkoutSessionState, emailState];

  const isAllResolved = allStates.every((state) => isResolved(state.meta));

  if (isAllResolved) {
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
  }

  const isAnyErrored = allStates.some((state) => isErrored(state.meta));
  if (isAnyErrored) {
    const errors = allStates.map((state) => state.meta.error).filter(Boolean);
    console.error(errors);
    return <ErrorPage errors={errors} />;
  }

  // landed on page without session data returned from checkout
  if (isResolved(sessionState.meta) && !checkoutData) {
    return <Redirect to="/store" />;
  }

  // still processing
  return <Spinner variant="large" />;
};

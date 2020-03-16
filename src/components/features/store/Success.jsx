import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Content, Header2 } from '../../common/Structure';
import * as MetaStatus from '../../../redux/utils/meta-status';
import { updateOne as updateUser } from '../../../redux/users/actions';
import { Spinner } from '../../common/Spinner';
import { Button } from '../../common/Button';
import { boxShadow, spacing } from '../../../constants/style-guide';
import { fetchSession, fetchSessionUser } from '../../../redux/session/actions';
import { updateOne as updateCheckoutSession } from '../../../redux/checkout-session/actions';
import { addMember } from '../../../redux/email/actions';
import { ErrorPage } from '../ErrorPage';
import { formatAmount } from '../../../utils/format-helpers';

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
const FooterMessage = styled('div')`
  margin-bottom: ${spacing.double}px;
`;

const ReceiptFooter = styled('div')`
  margin-top: ${spacing.double}px;
`;

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
  const sessionUser = sessionState.data.user;

  // get session data from server
  const _fetchSession = () => {
    if (!MetaStatus.isInitial(sessionState.meta)) {
      dispatch(fetchSession());
    }
  };

  // update new customer with shipping info
  const _updateCheckoutSession = () => {
    if (checkoutData) {
      dispatch(fetchSessionUser(checkoutData.formValues.email));
      dispatch(updateCheckoutSession(checkoutData.formValues, sessionId));
    }
  };

  const _updateUser = () => {
    if (sessionUser && !sessionUser.paymentCustomerId && checkoutData) {
      const userRecord = {
        ...sessionUser,
        paymentCustomerId: checkoutData?.customer,
        firstName: checkoutData.formValues.firstName,
        lastName: checkoutData.formValues.lastName,
        isActive: 1,
      };
      dispatch(updateUser(userRecord));
    }
  };

  // add member to subscribers list and optionally to newsletter list
  const _addMember = () => {
    if (MetaStatus.isResolved(usersState.meta)) {
      const { email, firstName, lastName, newsletterSignup } = checkoutData.formValues;
      const tags = ['Subscriber'];
      if (newsletterSignup) {
        tags.push('Newsletter');
      }
      dispatch(addMember({ email, firstName, lastName, tags }));
    }
  };

  useEffect(_fetchSession, []);
  useEffect(_updateCheckoutSession, [checkoutData]);
  useEffect(_updateUser, [sessionUser, checkoutData]);
  useEffect(_addMember, [MetaStatus.isResolved(usersState.meta)]);

  const requiredStates = [sessionState, checkoutSessionState];

  const isAllResolved = requiredStates.every((state) => MetaStatus.isResolved(state.meta));

  if (isAllResolved) {
    // show receipt
    return (
      <Wrapper>
        <Content>
          <Header2>Your order has been processed successfully.</Header2>
          <ConfNumber>
            <Label>Confirmation #: </Label>
            <Value>{checkoutData.payment_intent}</Value>
          </ConfNumber>
          {checkoutData.display_items.map((item) => (
            <ReceiptItem item={item} key={item.custom.description} />
          ))}
          <ReceiptFooter>
            <FooterMessage>You should receive an email confirmation shortly.</FooterMessage>
            <Link to="/account/orders">
              <Button>View Orders</Button>
            </Link>
          </ReceiptFooter>
        </Content>
      </Wrapper>
    );
  }

  const isAnyErrored = requiredStates.some((state) => MetaStatus.isErrored(state.meta));
  if (isAnyErrored) {
    const errors = requiredStates.map((state) => state.meta.error).filter(Boolean);
    console.error(errors);
    return <ErrorPage errors={errors} />;
  }

  // landed on page without session data returned from checkout
  if (MetaStatus.isResolved(sessionState.meta) && !checkoutData) {
    return <Redirect to="/store" />;
  }

  // still processing
  return <Spinner variant="large" />;
};

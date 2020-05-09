import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import * as MetaStatus from '../../../../utils/meta-status';
import { UserMessage } from '../../../common/UserMessage';
import { Spinner } from '../../../common/Spinner';
import { Header } from '../../admin/Header';
import { OrderItem } from './OrderItem';
import { fetchMany as fetchOrders } from '../../../../redux/orders/actions';
import { Content } from '../../../common/Structure';

const Wrapper = styled(Content)``;
const Text = styled('div')``;

const SignInMessage = () => {
  const action = {
    linkPath: '/account/sign-in',
    text: 'Sign in',
  };

  return (
    <UserMessage Message={() => <Text>Please sign in to view orders.</Text>} action={action} />
  );
};

const OrdersList = ({ orders, isBusy }) => {
  if (isBusy) {
    return <Spinner variant="large" />;
  }

  if (orders.length === 0) {
    const action = {
      linkPath: '/store',
      text: 'Visit store',
    };
    return (
      <UserMessage Message={() => <Text>No orders found for this account.</Text>} action={action} />
    );
  }

  return orders.map((order) => <OrderItem order={order} key={order.id} />);
};

export const Page = () => {
  const dispatch = useDispatch();
  const sessionState = useSelector((state) => state.session);
  const ordersState = useSelector((state) => state.orders);

  const sessionUser = sessionState.data?.user;
  const _fetchOrders = () => {
    if (sessionUser && ordersState.data.length === 0 && MetaStatus.isInitial(ordersState.meta)) {
      dispatch(fetchOrders(sessionUser.paymentCustomerId));
    }
  };
  useEffect(_fetchOrders, [sessionUser]);

  if (MetaStatus.isBusy(sessionState.meta) || MetaStatus.isBusy(ordersState.meta)) {
    return <Spinner variant="large" />;
  }

  if (MetaStatus.isResolved(sessionState.meta) && !sessionUser) {
    return <SignInMessage />;
  }

  return (
    <Wrapper>
      <Header title="Past Orders" />
      <OrdersList orders={ordersState.data} />
    </Wrapper>
  );
};

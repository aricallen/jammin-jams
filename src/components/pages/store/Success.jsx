import React from 'react';
import styled from '@emotion/styled';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Content, Header2 } from '../../common/Structure';
import { isBusy, isResolved } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';

const Wrapper = styled('div')``;

const Item = styled('div')`
  display: flex;
  align-items: center;
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
      <Name>{item.custom.name}</Name>
      <Description>{item.custom.description}</Description>
      <Amount>{formatAmount(item.amount)}</Amount>
    </Item>
  );
};

export const Success = ({ location }) => {
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const sessionState = useSelector((state) => state.session);
  const checkoutData = sessionState.data[sessionId];

  if (isBusy(sessionState.meta)) {
    return <Spinner variant="large" />;
  }

  if (isResolved(sessionState.meta) && !checkoutData) {
    return <Redirect to="/store" />;
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

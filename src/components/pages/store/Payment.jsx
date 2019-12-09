import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Content, Header1, Section, Header2 } from '../../common/Structure';

export const Payment = ({ history, location }) => {
  const sessionState = useSelector((state) => state.session);
  const dispatch = useDispatch();

  if (!sessionState.token && !sessionState.isFetching) {
  }

  return (
    <Content>
      <Header1>Payment</Header1>
      <Section>
        <Header2>Billing Info</Header2>
        <div>checkbox to use delivery info</div>
      </Section>
      <Section>
        <Header2>Payment Info</Header2>
        <div>form for square or paypal or whatevs</div>
      </Section>
    </Content>
  );
};

import React from 'react';
import { parse } from 'query-string';
import { Content, Header1, Section, Header2 } from '../../common/Structure';

export const Payment = ({ history, location }) => {
  const userInfo = parse(location.search);
  if (Object.entries(userInfo).length === 0) {
    return history.push({ pathname: '/store', search: location.search });
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

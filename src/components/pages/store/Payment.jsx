import React from 'react';
import { Content, Header1, Section, Header2 } from '../../common/Structure';

export const isValid = () => true;

export const Payment = () => {
  return (
    <Content>
      <Header1>Payment</Header1>
      <Section>
        <Header2>Payment Info</Header2>
        <div>form for square or paypal or whatevs</div>
      </Section>
    </Content>
  );
};

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Content, Header1, Section, Header2, Paragraph, Link } from '../../common/Structure';
import { initForm } from '../../../services/square';

const CardFormContainer = styled('div')``;

export const isValid = () => true;

export const Payment = (props) => {
  const { values, onUpdate } = props;
  const [showBilling, setShowBuilding] = useState(false);

  const init = () => {
    initForm();
  };

  useEffect(init, []);

  return (
    <Content>
      <Header1>Payment</Header1>
      <Section>
        <Header2>Setup Recurring Payment</Header2>
        <Paragraph>
          Jammin Jams does not retain any credit card information directly. We leverage Square for
          our payments. Visit{' '}
          <Link href="https://squareup.com/us/en/security">Square Security</Link> for more
          information.
        </Paragraph>
      </Section>
      <Section>{/* <Paragraph>
          Use shipping information?
        </Paragraph> */}</Section>
      <Section>
        <CardFormContainer>
          <div id="sq-card-number" />
          <div id="sq-expiration-date" />
          <div id="sq-cvv" />
          <div id="sq-zip-code" />
        </CardFormContainer>
      </Section>
    </Content>
  );
};

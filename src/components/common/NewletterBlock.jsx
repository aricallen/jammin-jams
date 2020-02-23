import React from 'react';
import styled from '@emotion/styled';
import { Header2, Paragraph } from './Structure';
import { pallet, spacing, border } from '../../constants/style-guide';
import { NewsletterForm } from './NewsletterForm';

const Wrapper = styled('div')`
  border: ${border};
`;

const Header = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.regular}px;
  background-color: ${pallet.strawberry};
`;

const HeaderText = styled(Header2)`
  color: white;
  margin-bottom: 0;
`;

const ContentWrapper = styled('div')`
  padding: ${spacing.double}px;
`;

const FormWrapper = styled('div')`
  margin-top: ${spacing.double}px;
`;

export const NewsletterBlock = () => {
  return (
    <Wrapper>
      <Header>
        <HeaderText>Jam Journeys Newsletter</HeaderText>
      </Header>
      <ContentWrapper>
        <Paragraph>
          Sign up for our newlsetter to stay up to date on the latest flavors, features, music and
          adventures.
        </Paragraph>
        <FormWrapper>
          <NewsletterForm />
        </FormWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

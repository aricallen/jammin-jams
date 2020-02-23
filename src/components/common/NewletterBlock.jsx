import React from 'react';
import styled from '@emotion/styled';
import { pallet, spacing, border, font } from '../../constants/style-guide';
import { NewsletterForm } from './NewsletterForm';

const Wrapper = styled('div')`
  border: ${border};
  border-radius: ${spacing.regular}px;
  overflow: hidden;
`;

const Header = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.regular}px;
  background-color: ${pallet.strawberry};
`;

const HeaderText = styled('h2')`
  color: white;
  margin-bottom: 0;
  font-size: ${font.size.header2}px;
`;

const ContentWrapper = styled('div')`
  padding: ${spacing.double}px;
`;

const FormWrapper = styled('div')`
  margin-top: ${spacing.double}px;
`;

const Message = styled('span')`
  font-size: ${font.size.small}px;
`;

export const NewsletterBlock = () => {
  return (
    <Wrapper>
      <Header>
        <HeaderText>Jam Journeys Newsletter</HeaderText>
      </Header>
      <ContentWrapper>
        <Message>
          Sign up for our newlsetter to stay up to date on the latest flavors, features, music and
          adventures.
        </Message>
        <FormWrapper>
          <NewsletterForm />
        </FormWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Emphasis } from '../../common/Structure';
import { spacing, border } from '../../../constants/style-guide';

const StepWrapper = styled('div')`
  padding: ${spacing.double}px;
  border-right: ${border};
  &:last-of-type {
    border-right: none;
  }
`;

const SignUp = () => (
  <StepWrapper>
    <Emphasis>Sign up for subscription</Emphasis> -- You specify the preferred frequency of
    delivery: every month, two months, three months. Flavor picks are on us! They will depend on
    what produce is in season and looks extra juicy at the market.
  </StepWrapper>
);

const Delivery = () => (
  <StepWrapper>
    <Emphasis>Wait for delivery</Emphasis> -- You will receive an email that notifies you of the
    upcoming delivery at least one week in advance - We also have a{' '}
    <Link to="/about/delivery-calendar">delivery calendar</Link> you can access any time.
  </StepWrapper>
);

const GetASpoon = () => (
  <StepWrapper>
    <Emphasis>Get yourself a spoon</Emphasis> -- And some dancing shoes. Jam is in the near future!!
    Scan the QR code on each label to pair with the music we jammed while jammin. And then{' '}
    <a href="mailto:jam@jmnjams.com">tell us</a>, what fun are you looking forward to this month?
  </StepWrapper>
);

const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const HowItWorks = () => {
  return (
    <Wrapper>
      <SignUp />
      <Delivery />
      <GetASpoon />
    </Wrapper>
  );
};

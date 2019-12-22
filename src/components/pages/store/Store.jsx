import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Session } from '../../../constants/session';
// import { CSSTransition } from 'react-transition-group';
// import { Redirect } from 'react-router-dom';
import { Products } from './Products';
import { DeliveryMethod } from './DeliveryMethod';
import { Payment } from './Payment';
import { Shipping } from './Shipping';
import { StoreStep } from './constants';
import { Button } from '../../common/Button';
import { createSession, fetchSession } from '../../../redux/session/actions';
import { media } from '../../../utils/media';
import { ScreenSizes } from '../../../constants/style-guide';

const Wrapper = styled('div')`
  width: 50%;
  ${media.max(ScreenSizes.TABLET)} {
    width: 80%;
  }
  height: 400px;
`;

const StatusWrapper = styled('div')``;
const StatusBar = styled('div')``;
const ControlsWrapper = styled('div')``;
const StepComponentWrapper = styled('div')``;

const getComponent = (step) => {
  switch (step) {
    case StoreStep.PRODUCTS:
      return Products;
    case StoreStep.DELIVERY_METHOD:
      return DeliveryMethod;
    case StoreStep.SHIPPING:
      return Shipping;
    case StoreStep.PAYMENT:
      return Payment;
    default:
      return null;
  }
};

const stepComponents = [
  {
    id: 0,
    path: 'products',
    Component: Products,
  },
  {
    id: 1,
    path: 'delivery-method',
    Component: DeliveryMethod,
  },
  {
    id: 2,
    path: 'shipping',
    Component: Shipping,
  },
  {
    id: 3,
    path: 'payment',
    Component: Payment,
  },
];

export const Store = ({ history, match }) => {
  const { step } = match.params;
  const stepLevel = stepComponents.findIndex((config) => config.path === step);
  const sessionState = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const load = () => {
    dispatch(fetchSession());
  };
  useEffect(load, []);

  const handleNavClick = (type) => () => {
    const nextStepLevel = type === 'prev' ? stepLevel - 1 : stepLevel + 1;
    const nextConfig = stepComponents[nextStepLevel];
    history.push(`/store/${nextConfig.path}`);
  };

  const Component = getComponent(step);

  if (!Component) {
    console.error(`unknown step: "${step}"`);
    return null;
  }

  return (
    <Wrapper>
      <StatusWrapper>
        <StatusBar />
      </StatusWrapper>
      <StepComponentWrapper>
        <Component sessionState={sessionState} />
      </StepComponentWrapper>
      {/* {stepComponents.map((config) => <config.Component key={config.id} />)} */}
      <ControlsWrapper>
        <Button onClick={handleNavClick('prev')} disabled={stepLevel <= 0}>
          Prev
        </Button>
        <Button onClick={handleNavClick('next')} disabled={stepLevel >= 4}>
          Next
        </Button>
      </ControlsWrapper>
    </Wrapper>
  );
};

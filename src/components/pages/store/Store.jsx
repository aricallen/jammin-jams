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
import { ScreenSizes, spacing, sizes } from '../../../constants/style-guide';
import { Spinner } from '../../common/Spinner';

const Wrapper = styled('div')`
  display: grid;
  grid-template-rows: ${sizes.rowHeight}px auto ${sizes.rowHeight}px;
  width: 50%;
  ${media.max(ScreenSizes.TABLET)} {
    width: 100%;
  }
  height: 100%;
`;

const StatusWrapper = styled('div')``;
const StatusBar = styled('div')``;
const ControlsWrapper = styled('div')`
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: space-between;
`;

const Footer = styled('div')`
  display: flex:
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: ${spacing.double}px;
`;

const StepComponentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

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
  const [values, setValues] = useState({});

  const { isUpdating } = sessionState;

  const load = () => {
    dispatch(fetchSession());
  };
  useEffect(load, []);

  const handleNavClick = (type) => async () => {
    const nextStepLevel = type === 'prev' ? stepLevel - 1 : stepLevel + 1;
    const nextConfig = stepComponents[nextStepLevel];
    await dispatch(createSession({ data: values, key: Session.SUBSCRIPTION_FORM }));
    history.push(`/store/${nextConfig.path}`);
  };

  const onUpdate = (newValues) => {
    setValues(newValues);
  };

  const Component = getComponent(step);

  if (!Component) {
    console.error(`unknown step: "${step}"`);
    return null;
  }

  const { isFetching } = sessionState.meta;

  return (
    <Wrapper>
      <StatusWrapper>
        <StatusBar />
      </StatusWrapper>
      <StepComponentWrapper>
        {isFetching ? (
          <Spinner />
        ) : (
          <Component
            sessionState={sessionState.data[Session.SUBSCRIPTION_FORM]}
            onUpdate={onUpdate}
          />
        )}
      </StepComponentWrapper>
      <Footer>
        <ControlsWrapper>
          <Button onClick={handleNavClick('prev')} disabled={stepLevel <= 0} isBusy={isUpdating}>
            Prev
          </Button>
          <Button onClick={handleNavClick('next')} disabled={stepLevel >= 4} isBusy={isUpdating}>
            Next
          </Button>
        </ControlsWrapper>
      </Footer>
    </Wrapper>
  );
};

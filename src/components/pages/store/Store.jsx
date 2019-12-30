import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Session } from '../../../constants/session';
// import { CSSTransition } from 'react-transition-group';
// import { Redirect } from 'react-router-dom';
import { Products, isValid as isValidProducts } from './Products';
import { DeliveryMethod, isValid as isValidDeliveryMethod } from './DeliveryMethod';
import { Payment, isValid as isValidPayment } from './Payment';
import { Shipping, isValid as isValidShipping } from './Shipping';
import { Button } from '../../common/Button';
import { createSession, fetchSession } from '../../../redux/session/actions';
import { media } from '../../../utils/media';
import { ScreenSizes, spacing, sizes } from '../../../constants/style-guide';
import { Spinner } from '../../common/Spinner';
import { submitForm } from '../../../services/square';

const Wrapper = styled('div')`
  display: grid;
  grid-template-rows: 0px auto ${sizes.rowHeight}px;
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

const Form = styled('form')`
  height: 100%;
`;

export const stepComponents = [
  {
    id: 0,
    path: 'products',
    Component: Products,
    isValid: isValidProducts,
  },
  {
    id: 1,
    path: 'delivery-method',
    Component: DeliveryMethod,
    isValid: isValidDeliveryMethod,
  },
  {
    id: 2,
    path: 'shipping',
    Component: Shipping,
    isValid: isValidShipping,
  },
  {
    id: 3,
    path: 'payment',
    Component: Payment,
    isValid: isValidPayment,
  },
];

export const Store = ({ history, match }) => {
  const { step } = match.params;
  const stepLevel = stepComponents.findIndex((config) => config.path === step);
  const sessionState = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const sessionValues = sessionState.data[Session.SUBSCRIPTION_FORM] || {};
  const [values, setValues] = useState(sessionValues || {});

  const load = () => {
    dispatch(fetchSession());
  };
  useEffect(load, []);

  const handlePrevClick = (event) => {
    event.preventDefault();
    const nextStepLevel = stepLevel - 1;
    const nextConfig = stepComponents[nextStepLevel];
    history.push(`/store/${nextConfig.path}`);
  };

  const onUpdate = (fieldValues) => {
    const newValues = { ...values, ...fieldValues };
    setValues(newValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextStepLevel = stepLevel + 1;
    const nextConfig = stepComponents[nextStepLevel];
    await dispatch(createSession({ data: values, key: Session.SUBSCRIPTION_FORM }));
    if (nextConfig) {
      history.push(`/store/${nextConfig.path}`);
    } else {
      submitForm(values);
    }
  };

  // no session, redirect back to beginning
  if (stepLevel > 0 && Object.keys(values).length === 0) {
    // history.push(`/store/${stepComponents[0].path}`);
  }

  const { Component } = stepComponents[stepLevel];

  if (!Component) {
    console.error(`unknown step: "${step}"`);
    return null;
  }

  const { isFetching, isUpdating } = sessionState.meta;

  return (
    <Form onSubmit={handleSubmit}>
      <Wrapper>
        <StatusWrapper>
          <StatusBar />
        </StatusWrapper>
        <StepComponentWrapper>
          {isFetching ? <Spinner /> : <Component values={values} onUpdate={onUpdate} />}
        </StepComponentWrapper>
        <Footer>
          <ControlsWrapper>
            <Button onClick={handlePrevClick} disabled={stepLevel <= 0} isBusy={isUpdating}>
              Prev
            </Button>
            <Button
              type="submit"
              disabled={stepLevel >= 4 || !stepComponents[stepLevel].isValid(values)}
              isBusy={isUpdating}
            >
              Next
            </Button>
          </ControlsWrapper>
        </Footer>
      </Wrapper>
    </Form>
  );
};

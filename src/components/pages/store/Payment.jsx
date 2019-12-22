import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Content, Header1, Section, Header2 } from '../../common/Structure';
import { fetchSession } from '../../../redux/session/actions';
import { Spinner } from '../../common/Spinner';
import { SubscriptionForm } from './SubscriptionForm';

export const Payment = () => {
  const sessionState = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const { isFetching } = sessionState.meta;

  const load = () => {
    dispatch(fetchSession());
  };

  useEffect(load, []);

  return (
    <Content>
      <Header1>Payment</Header1>
      {isFetching ? (
        <Spinner />
      ) : (
        <Fragment>
          <Section>
            <Header2>Billing Info</Header2>
            <div>checkbox to use delivery info</div>
          </Section>
          <Section>
            <Header2>Payment Info</Header2>
            <div>form for square or paypal or whatevs</div>
          </Section>
        </Fragment>
      )}
    </Content>
  );
};

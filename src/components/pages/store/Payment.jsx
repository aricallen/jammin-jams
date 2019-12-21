import React, { useEffect, Fragment } from 'react';
import qs from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { Content, Header1, Section, Header2 } from '../../common/Structure';
import { fetchSession } from '../../../redux/session/actions';
import { Spinner } from '../../common/Spinner';

export const Payment = ({ history, location }) => {
  const sessionState = useSelector((state) => state.session);
  const { sessionId } = qs.parse(location.search);
  const dispatch = useDispatch();
  const { isFetching } = sessionState.meta;

  const load = () => {
    if (!sessionState.data.sessionId || sessionState.data.sessionId !== sessionId) {
      dispatch(fetchSession({ sessionId }));
    }
  };

  useEffect(load, []);

  if (!sessionId) {
    return history.replace('/store');
  }

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

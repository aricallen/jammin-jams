import React, { useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { sendDebug } from '../../redux/email/actions';
import { UserMessage } from '../common/UserMessage';

const AdditionalMessage = styled('div')``;
const Text = styled('div')``;

const Message = ({ message }) => {
  return (
    <Fragment>
      <Text>
        Oh noes! We&apos;ve run into an error. Really sorry about that 😩. We have notified the
        developer (that&apos;s me) and they will start on a resolution right away! If you would like
        to provide additional information, please contact us at{' '}
        <a href="mailto:jam@jmnjams.com">jam@jmnjams.com</a>.
      </Text>
      <AdditionalMessage>{message}</AdditionalMessage>
    </Fragment>
  );
};

export const ErrorPage = ({ message = '', errors = [], debug = '' }) => {
  const dispatch = useDispatch();
  const send = () => {
    dispatch(sendDebug({ message, errors: errors.join('\n\n'), debug }));
  };
  useEffect(send, []);

  const action = {
    linkPath: '/',
    text: 'Return Home',
  };

  return <UserMessage action={action} Message={Message} />;
};

import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header2 } from '../common/Structure';
import { sendDebug } from '../../redux/email/actions';
import { Button } from '../common/Button';
import { media } from '../../utils/media';

const AdditionalMessage = styled('div')``;

const Wrapper = styled('div')`
  width: 60%;
  ${media.mobile()} {
    width: 80%;
  }
  padding-top: 6%;
  margin: 0 auto;
  text-align: center;
`;

const ActionWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;

export const ErrorPage = ({ message = '', errors = [], debug = '' }) => {
  const dispatch = useDispatch();
  const send = () => {
    dispatch(sendDebug({ message, errors, debug }));
  };
  useEffect(send, []);

  return (
    <Wrapper>
      <Header2>
        Oh noes! We&apos;ve run into an error while processing your order. Really sorry about that
        😩. We have notified the developer (that&apos;s me) and they will start on a resolution
        right away! If you would like to provide additional information, please contact us at{' '}
        <a href="mailto:jam@jmnjams.com">jam@jmnjams.com</a>.
      </Header2>
      <AdditionalMessage>{message}</AdditionalMessage>
      <ActionWrapper>
        <Link to="/">
          <Button>Return Home</Button>
        </Link>
      </ActionWrapper>
    </Wrapper>
  );
};

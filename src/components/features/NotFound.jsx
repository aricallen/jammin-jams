import React, { useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { sendDebug } from '../../redux/email/actions';
import { UserMessage } from '../common/UserMessage';
import { Emoji } from '../common/Structure';
import { spacing } from '../../constants/style-guide';

const Text = styled('div')``;

const Wrapper = styled('div')``;

const EMOJI_SIZE = 120;

const EmojiWrapper = styled('div')`
  font-size: ${EMOJI_SIZE}px;
  line-height: ${EMOJI_SIZE}px;
  margin-bottom: ${spacing.double}px;
`;

const ImageSection = () => (
  <EmojiWrapper>
    <Emoji label="shrug">🤷🏽‍♀️</Emoji>
  </EmojiWrapper>
);

const Message = () => {
  return (
    <Fragment>
      <Text>
        Oh noes! We seem to have lost this page... Or maybe the link is broken? If you think this is
        a mistake and would like to vent your frustrations,{' '}
        <a href="mailto:dev@jmnjams.com">let the developer (that&apos;s me) know</a>.
      </Text>
    </Fragment>
  );
};

export const NotFound = () => {
  const dispatch = useDispatch();
  const message = window.location.href;
  const send = () => {
    dispatch(sendDebug({ message }));
  };
  useEffect(send, []);

  const action = {
    linkPath: '/',
    text: 'Return Home',
  };

  return (
    <Wrapper>
      <UserMessage action={action} Message={Message} ImageSection={ImageSection} />;
    </Wrapper>
  );
};

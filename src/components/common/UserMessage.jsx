import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { media } from '../../utils/media';
import { Header2 } from './Structure';
import { Button } from './Button';

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

/**
 * @param action { text: string, onClick?: () => void, linkPath?: string }
 */
export const UserMessage = ({ Message, action = null }) => {
  return (
    <Wrapper>
      <Header2>
        <Message />
      </Header2>
      <ActionWrapper>
        {action?.linkPath && (
          <Link to={action.linkPath}>
            <Button>{action.text}</Button>
          </Link>
        )}
        {action?.onClick && <Button onClick={action.onClick}>{action.text}</Button>}
      </ActionWrapper>
    </Wrapper>
  );
};

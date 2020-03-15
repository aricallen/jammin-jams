import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { media } from '../../utils/media';
import { Header2 } from './Structure';
import { Button } from './Button';
import { spacing } from '../../constants/style-guide';

const HeaderText = styled(Header2)`
  margin-bottom: ${spacing.double}px;
`;

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
export const UserMessage = ({ Message, ImageSection = null, action = null }) => {
  return (
    <Wrapper>
      <ImageSection />
      <HeaderText>
        <Message />
      </HeaderText>
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

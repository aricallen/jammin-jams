import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Content, Header2 } from '../../common/Structure';
import { Button } from '../../common/Button';
import { spacing } from '../../../constants/style-guide';

const Wrapper = styled('div')`
  padding-top: 6%;
  text-align: center;
`;

const Footer = styled('div')`
  margin-top: ${spacing.double}px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const Cancel = () => {
  return (
    <Wrapper>
      <Content>
        <Header2>Checkout session was cancelled successfully.</Header2>
        <Footer>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </Footer>
      </Content>
    </Wrapper>
  );
};

import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Header1 } from '../../common/Structure';
import { logOutUser } from '../../../redux/session/actions';
import { Button } from '../../common/Button';
import { isBusy, isResolved } from '../../../utils/meta-status';
import { spacing } from '../../../constants/style-guide';

const Wrapper = styled('div')`
  width: 100%;
  text-align: center;
  padding-top: 6%;
  div {
    margin-bottom: ${spacing.double}px;
  }
`;

const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;

export const SignOut = ({ history }) => {
  const dispatch = useDispatch();
  const sessionState = useSelector((state) => state.session);

  const logout = () => {
    if (sessionState.data.user) {
      dispatch(logOutUser());
    }
  };

  useEffect(logout, []);

  const isLoggedOut = isResolved(sessionState.meta) || !sessionState.data.user;

  return (
    <Wrapper>
      {isLoggedOut && (
        <Fragment>
          <Header1>You have logged out successfully.</Header1>
          <ButtonWrapper>
            <Button onClick={() => history.push('/')}>Return Home</Button>
          </ButtonWrapper>
        </Fragment>
      )}
      {isBusy(sessionState.meta) && <Header1>Logging out...</Header1>}
    </Wrapper>
  );
};

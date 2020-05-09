import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import { AlertMessage } from './AlertMessage';
import { fetch as fetchAppMeta } from '../../redux/app-meta/actions';
import { isResolved } from '../../utils/meta-status';
import { Button } from './Button';

const Actions = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

const isLiveNow = (alertStart, alertEnd) => {
  if (!alertStart || !alertEnd) {
    return false;
  }
  const now = Date.now();
  const startTime = new Date(alertStart).getTime();
  const endTime = new Date(alertEnd).getTime();
  return now > startTime && now < endTime;
};

export const AlertManager = () => {
  Modal.setAppElement('#app');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const appMetaState = useSelector((state) => state.appMeta);

  useEffect(() => {
    if (!isResolved(appMetaState.meta)) {
      dispatch(fetchAppMeta());
    }
  }, []);

  const { alertStart, alertEnd } = appMetaState.data;
  if (isLiveNow(alertStart, alertEnd) && isOpen === false) {
    setIsOpen(true);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Live Alert!"
      style={{
        content: {
          zIndex: 1000,
          margin: 'auto',
          marginTop: '64px',
          height: 'min-content',
          maxWidth: '48%',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.36)',
        },
      }}
    >
      <AlertMessage content="hello" />
      <Actions>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Dismiss
        </Button>
      </Actions>
    </Modal>
  );
};

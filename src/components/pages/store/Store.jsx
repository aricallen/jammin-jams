import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
// import { CSSTransition } from 'react-transition-group';
// import { Redirect } from 'react-router-dom';
import { media } from '../../../utils/media';
import { spacing, sizes } from '../../../constants/style-guide';
import { fetchInventoryItems } from '../../../redux/inventory-items/actions';
import { Spinner } from '../../common/Spinner';
import { InventoryItem } from './InventoryItem';
import { fetchSession } from '../../../redux/session/actions';

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const Store = ({ history }) => {
  const dispatch = useDispatch();
  const inventoryState = useSelector((state) => state.inventoryItems);
  const fetch = () => {
    dispatch(fetchInventoryItems());
    dispatch(fetchSession());
  };
  useEffect(fetch, []);

  const onSelect = (item) => {
    const sessionState = useSelector((state) => state.sessionState);
    if (!sessionState.data.user) {
      history.push({ pathname: '/account/log-in', search: `inventoryItemsId=${item.id}` });
    }
  };

  if (!inventoryState.data || inventoryState.meta.isFetching) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      {inventoryState.data.map((inventoryItem) => (
        <InventoryItem key={inventoryItem.id} inventoryItem={inventoryItem} onSelect={onSelect} />
      ))}
    </Wrapper>
  );
};

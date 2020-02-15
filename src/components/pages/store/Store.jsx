import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { media } from '../../../utils/media';
import { spacing, sizes } from '../../../constants/style-guide';
import { fetchProducts } from '../../../redux/products/actions';
import { Spinner } from '../../common/Spinner';
import { ProductItem } from './ProductItem';

const Wrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;

export const Store = ({ history }) => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  const sessionState = useSelector((state) => state.sessionState);

  const fetch = () => {
    dispatch(fetchProducts());
  };
  useEffect(fetch, []);

  const onSelect = (item) => {
    if (!sessionState.data.user) {
      history.push({ pathname: '/account/log-in', search: `productsId=${item.id}` });
    }
  };

  if (!productsState.data || productsState.meta.isFetching) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      {productsState.data.map((product) => (
        <ProductItem
          key={`${product.id}_${product.nickname}`}
          product={product}
          onSelect={onSelect}
        />
      ))}
    </Wrapper>
  );
};

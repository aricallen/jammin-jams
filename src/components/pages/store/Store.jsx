import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/products/actions';
import { fetchSkus } from '../../../redux/skus/actions';
import { addToCart, removeFromCart } from '../../../redux/cart/actions';
import { Spinner } from '../../common/Spinner';
import { ProductItem } from './ProductItem';

const Wrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Store = ({ history }) => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);

  const fetch = () => {
    dispatch(fetchProducts());
    dispatch(fetchSkus());
  };
  useEffect(fetch, []);

  const onAddItem = (product, sku) => {
    dispatch(addToCart(product, sku));
  };

  const onRemoveItem = (product, sku) => {
    dispatch(removeFromCart({ product, sku }));
  };

  const onCheckout = () => {
    history.push('/store/checkout');
  };

  if (!productsState.data || productsState.meta.isFetching) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      {productsState.data.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </Wrapper>
  );
};

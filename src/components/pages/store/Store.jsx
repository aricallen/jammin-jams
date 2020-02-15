import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { media } from '../../../utils/media';
import { spacing, sizes } from '../../../constants/style-guide';
import { fetchProducts } from '../../../redux/products/actions';
import { fetchPlans } from '../../../redux/plans/actions';
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
  const cart = useSelector((state) => state.cart.data);

  const fetch = () => {
    dispatch(fetchProducts());
    dispatch(fetchPlans());
  };
  useEffect(fetch, []);

  const onAddItem = (product, plan) => {
    dispatch(addToCart(product, plan));
  };

  const onRemoveItem = (product, plan) => {
    dispatch(removeFromCart({ product, plan }));
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
          key={`${product.id}_${product.nickname}`}
          product={product}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </Wrapper>
  );
};

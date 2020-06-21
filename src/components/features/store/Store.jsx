import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { fetchProducts } from '../../../redux/products/actions';
import { addToCart, removeFromCart } from '../../../redux/cart/actions';
import { Spinner } from '../../common/Spinner';
import { ProductItem } from './ProductItem';
import { CartPreview } from './CartPreview';
import { Content } from '../../common/Structure';
import { isResolved } from '../../../utils/meta-status';
import { useIsAllowedStoreAccess } from './hooks';

const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: ${(p) => (p.hasCart ? '3fr 1fr' : '100%')};
`;

const List = styled(Content)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Store = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isAllowed = useIsAllowedStoreAccess();
  if (!isAllowed) {
    return <Redirect to="/p/covid-waitlist" />;
  }
  const searchParams = new URLSearchParams(location.search);
  const productsState = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.data);

  const fetch = () => {
    dispatch(fetchProducts());
  };
  useEffect(fetch, []);

  const onAddItem = (item) => {
    dispatch(addToCart(item));
  };

  const onRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const onCheckout = () => {
    history.push({ pathname: '/store/checkout', search: searchParams.toString() });
  };

  if (!isResolved(productsState.meta)) {
    return <Spinner variant="large" />;
  }

  const products = productsState.data.filter((p) => p.type === 'good');

  return (
    <Wrapper hasCart={cart.length > 0}>
      <List>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </List>
      <CartPreview onCheckout={onCheckout} />
    </Wrapper>
  );
};

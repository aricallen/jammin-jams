import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../../redux/cart/actions';
import { isResolved } from '../../../utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { Content } from '../../common/Structure';
import { CartPreview } from './CartPreview';
import { ProductItem } from './ProductItem';
import { useCrudState } from '../../../hooks/useCrudState';

const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: ${(p) => (p.hasCart ? '3fr 1fr' : '100%')};
`;

const List = styled(Content)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Fundraiser = () => {
  const dispatch = useDispatch();
  const { fetch: fetchProducts, state: productsState } = useCrudState();
  const history = useHistory();
  const cart = useSelector((state) => state.cart.data);

  useEffect(() => {
    fetchProducts('/api/fundraiser/products');
  }, []);

  const onAddItem = (item) => {
    dispatch(addToCart(item));
  };

  const onRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const onCheckout = () => {
    history.push({ pathname: '/fundraiser/checkout' });
  };

  if (!isResolved(productsState.meta)) {
    return <Spinner variant="large" />;
  }

  return (
    <Wrapper hasCart={cart.length > 0}>
      <List>
        {productsState.data.map((product) => (
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

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
import { fetchProducts } from '../../../redux/products/actions';

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
  const history = useHistory();
  const productsState = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.data);

  useEffect(() => {
    dispatch(fetchProducts());
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

  const products = productsState.data.filter((p) => p.metadata?.type === 'fundraiser');

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

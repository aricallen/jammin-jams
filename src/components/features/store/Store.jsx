import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/products/actions';
import { fetchSkus } from '../../../redux/skus/actions';
import { addToCart, removeFromCart } from '../../../redux/cart/actions';
import { Spinner } from '../../common/Spinner';
import { ProductItem } from './ProductItem';
import { CartPreview } from './CartPreview';
import { Content } from '../../common/Structure';
import { isResolved } from '../../../redux/utils/meta-status';

const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: ${(p) => (p.hasCart ? '3fr 1fr' : '100%')};
`;

const List = styled(Content)`
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
    dispatch(fetchSkus());
  };
  useEffect(fetch, []);

  const onAddItem = (item) => {
    dispatch(addToCart(item));
  };

  const onRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const onCheckout = () => {
    history.push('/store/checkout');
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

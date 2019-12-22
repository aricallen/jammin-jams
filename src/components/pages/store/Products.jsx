import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Content, Header1, Section, Header2 } from '../../common/Structure';
import { ProductPicker } from './ProductPicker';
import { DeliveryMethod } from './DeliveryMethod';
import { media } from '../../../utils/media';
import { ScreenSizes, spacing } from '../../../constants/style-guide';
import { createSession, fetchSession } from '../../../redux/session/actions';
import { Session } from '../../../constants/session';
import { PRODUCTS } from './constants';

const ProductWrapper = styled('div')`
  width: 50%;
  ${media.max(ScreenSizes.TABLET)} {
    width: 80%;
  }
  height: 400px;
`;

const SectionHeader = styled(Header2)`
  margin-bottom: ${spacing.double}px;
`;

export const Products = ({ history }) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const sessionState = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const load = () => {
    dispatch(fetchSession());
  };
  useEffect(load, []);

  const normalized = PRODUCTS.map((product) => ({
    ...product,
    isSelected: product.label === selectedProduct.label,
  }));

  const onSubmit = async (values) => {
    const data = { ...values, productId: selectedProduct.id };
    await dispatch(createSession({ data, key: Session.SUBSCRIPTION_FORM }));
    history.push({ pathname: '/store/payment' });
  };

  return (
    <Content>
      <Header1>Subscribe for a truly unique jam experience!</Header1>
      <SectionHeader>Frequency</SectionHeader>

      <Section>
        <ProductWrapper>
          <ProductPicker products={normalized} onSelect={setSelectedProduct} />
        </ProductWrapper>
      </Section>

      {selectedProduct.id && (
        <ProductWrapper>
          <DeliveryMethod />
        </ProductWrapper>
      )}
    </Content>
  );
};

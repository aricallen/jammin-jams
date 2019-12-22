import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Header1, Section, Header2 } from '../../common/Structure';
import { ProductPicker } from './ProductPicker';
import { media } from '../../../utils/media';
import { ScreenSizes, spacing } from '../../../constants/style-guide';
import { createSession, fetchSession } from '../../../redux/session/actions';
import { Session } from '../../../constants/session';
import { PRODUCTS } from './constants';

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
    <Fragment>
      <Header1>Subscribe for a truly unique jam experience!</Header1>
      <SectionHeader>Frequency</SectionHeader>

      <Section>
        <ProductPicker products={normalized} onSelect={setSelectedProduct} />
      </Section>
    </Fragment>
  );
};

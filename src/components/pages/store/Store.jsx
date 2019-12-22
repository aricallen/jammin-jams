import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Content, Header1, Section, Header2 } from '../../common/Structure';
import { ProductPicker } from './ProductPicker';
import { SubscriptionForm } from './SubscriptionForm';
import { media } from '../../../utils/media';
import { ScreenSizes, spacing } from '../../../constants/style-guide';
import { createSession, fetchSession } from '../../../redux/session/actions';
import { Session } from '../../../constants/session';

const products = [
  {
    label: 'Frequency / Quantity',
    text: '1 Jar',
  },
  {
    id: 1,
    label: 'Every month',
    text: '$11.99',
  },
  {
    id: 2,
    label: 'Every 2 months',
    text: '$12.99',
  },
  {
    id: 3,
    label: 'Every 3 months',
    text: '$12.99',
  },
];

const ProductWrapper = styled('div')`
  width: 50%;
  ${media.max(ScreenSizes.TABLET)} {
    width: 80%;
  }
  height: 400px;
`;

const FormWrapper = styled(ProductWrapper)`
  height: auto;
`;

const SectionHeader = styled(Header2)`
  margin-bottom: ${spacing.double}px;
`;

export const Store = ({ history }) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const sessionState = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const fetch = () => {
    dispatch(fetchSession());
  };
  useEffect(fetch, []);

  const normalized = products.map((product) => ({
    ...product,
    isSelected: product.label === selectedProduct.label,
  }));

  const onSubmit = async (values) => {
    const data = { ...values, productId: selectedProduct.id };
    const sessionId = await dispatch(createSession({ data, key: Session.SUBSCRIPTION_FORM }));
    if (sessionId) {
      history.push({ pathname: '/store/payment' });
    }
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

      {selectedProduct.id ? (
        <Section>
          <SectionHeader>Delivery</SectionHeader>
          <FormWrapper>
            <SubscriptionForm onSubmit={onSubmit} isBusy={sessionState.isUpdating} />
          </FormWrapper>
        </Section>
      ) : null}
    </Content>
  );
};

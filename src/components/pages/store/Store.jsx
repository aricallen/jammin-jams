import React, { useState } from 'react';
import { stringify } from 'query-string';
import styled from '@emotion/styled';
import { Content, Header1, Section, Header2 } from '../../common/Structure';
import { ProductPicker } from './ProductPicker';
import { AddressForm } from './UserInfoForm';
import { media } from '../../../utils/media';
import { ScreenSizes, spacing } from '../../../constants/style-guide';

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

  const normalized = products.map((product) => ({
    ...product,
    isSelected: product.label === selectedProduct.label,
  }));

  const onSubmit = (values) => {
    const queryString = stringify({ ...values, productId: selectedProduct.id });
    history.push({ pathname: '/payment', search: queryString });
  };

  return (
    <Content>
      <Header1>Subscribe for a truly unique jam experience!</Header1>
      <Section>Choose a frequency and quantity by selecting a square below.</Section>

      <Section>
        <ProductWrapper>
          <ProductPicker products={normalized} onSelect={setSelectedProduct} />
        </ProductWrapper>
      </Section>

      {selectedProduct.id ? (
        <Section>
          <SectionHeader>Delivery</SectionHeader>
          <FormWrapper>
            <AddressForm onSubmit={onSubmit} />
          </FormWrapper>
        </Section>
      ) : null}
    </Content>
  );
};

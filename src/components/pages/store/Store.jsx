import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Content, Header1, Section, Header2 } from '../../common/Structure';
import { ProductPicker } from './ProductPicker';
import { AddressForm } from './AddressForm';
import { media } from '../../../utils/media';
import { ScreenSizes } from '../../../constants/style-guide';

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

const Wrapper = styled('div')`
  width: 50%;
  ${media.max(ScreenSizes.TABLET)} {
    width: 80%;
  }
  height: 400px;
`;

export const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState({});

  const normalized = products.map((product) => ({
    ...product,
    isSelected: product.label === selectedProduct.label,
  }));

  const onSubmit = (values) => {
    console.log('submitting', values);
  };

  return (
    <Content>
      <Header1>Subscribe for a truly unique jam experience!</Header1>
      <Section>Choose a frequency and quantity by selecting a square below.</Section>

      <Section>
        <Wrapper>
          <ProductPicker products={normalized} onSelect={setSelectedProduct} />
        </Wrapper>
      </Section>

      {selectedProduct.id ? (
        <Section>
          <Wrapper>
            <Header2>Delivery</Header2>
            <AddressForm onSubmit={onSubmit} />
          </Wrapper>
        </Section>
      ) : null}
    </Content>
  );
};

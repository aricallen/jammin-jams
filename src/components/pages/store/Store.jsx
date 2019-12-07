import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Content, Header1, Section } from '../../common/Structure';
import { ProductPicker } from './ProductPicker';
import { media } from '../../../utils/media';
import { ScreenSizes } from '../../../constants/style-guide';

const products = [
  {
    label: 'Quantity / Frequency',
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

  return (
    <Content>
      <Header1>Subscribe for a truly unique jam experience!</Header1>
      <Section>Choose a frequency and quantity by selecting a square below.</Section>

      <Section>
        <Wrapper>
          <ProductPicker products={normalized} onSelect={setSelectedProduct} />
        </Wrapper>
      </Section>
    </Content>
  );
};

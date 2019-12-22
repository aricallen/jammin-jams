import React, { useState, Fragment } from 'react';
import styled from '@emotion/styled';
import { Section, Header2 } from '../../common/Structure';
import { ProductPicker } from './ProductPicker';
import { PRODUCTS } from './constants';
import { spacing, font } from '../../../constants/style-guide';

const SectionHeader = styled(Header2)`
  margin-bottom: ${spacing.double}px;
`;

const Value = styled('span')`
  font-style: italic;
  font-weight: ${font.weight.bold};
`;

export const Products = (props) => {
  const { onUpdate, formValues } = props;
  const [selectedProduct, setSelectedProduct] = useState(
    formValues.productId ? PRODUCTS.find((p) => p.id === formValues.productId) : {}
  );

  const onSelect = (product) => {
    onUpdate({ productId: product.id });
    setSelectedProduct(product);
  };

  const normalized = PRODUCTS.map((product) => ({
    ...product,
    isSelected: product.label === selectedProduct.label,
  }));

  return (
    <Fragment>
      <SectionHeader>
        Frequency {selectedProduct.id && <Value>: {selectedProduct.label}</Value>}
      </SectionHeader>
      <Section style={{ flexGrow: 1 }}>
        <ProductPicker products={normalized} onSelect={onSelect} />
      </Section>
    </Fragment>
  );
};

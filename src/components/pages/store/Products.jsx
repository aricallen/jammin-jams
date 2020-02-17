import React, { useState, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Section, Header2 } from '../../common/Structure';
import { ProductPicker } from './ProductPicker';
import { spacing, font } from '../../../constants/style-guide';
import { fetchProducts } from '../../../redux/products/actions';
import { Spinner } from '../../common/Spinner';

const SectionHeader = styled(Header2)`
  margin-bottom: ${spacing.double}px;
`;

const Value = styled('span')`
  font-style: italic;
  font-weight: ${font.weight.bold};
`;

export const isValid = (sessionData = {}) => {
  return !!sessionData.productsId;
};

export const Products = (props) => {
  const { onUpdate, values } = props;
  const dispatch = useDispatch();
  const { data, meta } = useSelector((state) => state.products);
  const fetch = () => {
    dispatch(fetchProducts());
  };
  useEffect(fetch, []);

  const [selectedProduct, setSelectedProduct] = useState(
    values.productsId ? data.find((p) => p.id === values.productsId) : {}
  );

  const onSelect = (product) => {
    onUpdate({ productsId: product.id });
    setSelectedProduct(product);
  };

  if (!data || meta.isFetching) {
    return <Spinner />;
  }

  const normalized = data
    .filter((ii) => ii.productCategoriesId === 1)
    .map((item) => ({
      ...item,
      isSelected: item.id === selectedProduct.id,
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

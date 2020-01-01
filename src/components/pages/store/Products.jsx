import React, { useState, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Section, Header2 } from '../../common/Structure';
import { ProductPicker } from './ProductPicker';
import { INVENTORY_ITEMS_ID } from './constants';
import { spacing, font } from '../../../constants/style-guide';
import { fetchInventoryItems } from '../../../redux/inventory-items/actions';
import { Spinner } from '../../common/Spinner';

const SectionHeader = styled(Header2)`
  margin-bottom: ${spacing.double}px;
`;

const Value = styled('span')`
  font-style: italic;
  font-weight: ${font.weight.bold};
`;

export const isValid = (sessionData = {}) => {
  return !!sessionData.inventoryItemsId;
};

export const Products = (props) => {
  const { onUpdate, values } = props;
  const dispatch = useDispatch();
  const { data, meta } = useSelector((state) => state.inventoryItems);
  const fetch = () => {
    dispatch(fetchInventoryItems());
  };
  useEffect(fetch, []);

  const [selectedProduct, setSelectedProduct] = useState(
    values.inventoryItemsId ? data.find((p) => p.id === values.inventoryItemsId) : {}
  );

  const onSelect = (product) => {
    onUpdate({ inventoryItemsId: product.id });
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
        <ProductPicker inventoryItems={normalized} onSelect={onSelect} />
      </Section>
    </Fragment>
  );
};

import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { pallet } from '../../../constants/style-guide';

const Grid = styled('div')`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(${(p) => p.numRows}, 1fr);
`;

const Cell = styled('div')`
  background-color: white;
`;

const SelectableCell = styled('div')``;

const Row = styled('div')`
  &:hover {
    cursor: ${(p) => (p.isSelectable ? 'pointer' : 'initial')};
    div {
      background-color: ${(p) => (p.isSelectable ? pallet.babyBlue : 'initial')};
    }
  }

  display: contents;
  &:last-child {
    & > div {
      border-bottom: 1px solid ${pallet.charcoal};
    }
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${pallet.charcoal};
    border-right: none;
    border-bottom: none;
    transition: background-color 0.3s ease-in-out;
    background-color: ${(p) => (p.isSelected ? pallet.babyBlue : 'initial')};
    &:last-child {
      border-right: 1px solid ${pallet.charcoal};
    }
  }
`;

const renderCell = ({ product, onSelect }) => {
  if (!product.id) {
    return (
      <Fragment>
        <Cell>{product.label}</Cell>
        <Cell>{product.text}</Cell>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <SelectableCell onClick={() => onSelect(product)}>{product.label}</SelectableCell>
      <SelectableCell onClick={() => onSelect(product)}>{product.text}</SelectableCell>
    </Fragment>
  );
};

export const ProductPicker = (props) => {
  const { products, onSelect } = props;

  return (
    <Grid numRows={products.length}>
      {products.map((product, i) => (
        <Row key={product.label} isSelected={product.isSelected} isSelectable={i > 0}>
          {renderCell({ product, onSelect })}
        </Row>
      ))}
    </Grid>
  );
};

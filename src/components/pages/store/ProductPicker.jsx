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

const formatName = (name) => {
  return name.split(' -- ').pop();
};

const renderCell = ({ inventoryItem, onSelect }) => {
  return (
    <Fragment>
      <SelectableCell onClick={() => onSelect(inventoryItem)}>
        {formatName(inventoryItem.name)}
      </SelectableCell>
      <SelectableCell onClick={() => onSelect(inventoryItem)}>
        ${inventoryItem.price}
      </SelectableCell>
    </Fragment>
  );
};

export const ProductPicker = (props) => {
  const { products, onSelect } = props;

  return (
    <Grid numRows={products.length + 1}>
      <Row key="header-row" isSelectable={false}>
        <Cell>Frequency</Cell>
        <Cell>Price</Cell>
      </Row>
      {products.map((ii) => (
        <Row key={ii.name} isSelected={ii.isSelected} isSelectable={true}>
          {renderCell({ inventoryItem: ii, onSelect })}
        </Row>
      ))}
    </Grid>
  );
};

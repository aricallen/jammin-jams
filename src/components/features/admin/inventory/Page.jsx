import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useCrudState } from '../../../../hooks/useCrudState';
import { Spinner, Row, Section, Button, Input } from '../../../common';
import { Header } from '../Header';
// import { spacing } from '../../../../constants/style-guide';
import { isResolved, isInitial, isBusy } from '../../../../utils/meta-status';

const Name = styled('div')`
  min-width: 25%;
`;
const Count = styled('div')``;

const ListItem = ({ product, onChange }) => {
  return (
    <Row>
      <Name>{product.name}</Name>
      <Count>
        <Input name="count" value={product.quantity} type="number" onChange={onChange} />
      </Count>
    </Row>
  );
};

/**
 * fetch stripe products and display in list with counter to update inventory
 */

export const Page = () => {
  const [products, setProducts] = useState([]);
  const { fetch, update, state } = useCrudState();

  useEffect(() => {
    if (products.length === 0) {
      fetch('/api/fundraiser/products').then((res) => {
        setProducts(res);
      });
    }
  }, []);

  if (isInitial(state.meta)) {
    return <Spinner />;
  }

  const onClickSave = () => {
    update('/api/fundraiser/inventory', products).then((res) => setProducts(res));
  };

  const handleChange = (productId) => (e) => {
    const { value } = e.target;
    const updated = products.map((p) => {
      if (p.id === productId) {
        return { ...p, quantity: +value };
      }
      return p;
    });
    setProducts(updated);
  };

  return (
    <React.Fragment>
      <Header
        title="Inventory"
        Controls={() => (
          <Button isBusy={isBusy(state.meta)} onClick={onClickSave}>
            Save
          </Button>
        )}
      />
      <Section>
        {products.map((p) => (
          <ListItem product={p} key={p.id} onChange={handleChange(p.id)} />
        ))}
      </Section>
    </React.Fragment>
  );
};

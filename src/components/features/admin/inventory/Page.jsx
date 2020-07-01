import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCrudState } from '../../../../hooks/useCrudState';
import { Spinner, Row, Section, Button, Input } from '../../../common';
import { Header } from '../Header';
import { isInitial, isBusy } from '../../../../utils/meta-status';
import { fetchProducts } from '../../../../redux/products/actions';

const Name = styled('div')`
  min-width: 25%;
`;
const Count = styled('div')``;

const ListItem = ({ product, onChange }) => {
  return (
    <Row>
      <Name>{product.name}</Name>
      <Count>
        <Input name="count" value={product.quantity} type="number" min="-1" onChange={onChange} />
      </Count>
    </Row>
  );
};

/**
 * fetch stripe products and display in list with counter to update inventory
 */

export const Page = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState([]);
  const productsState = useSelector((state) => state.products);
  const { update, state } = useCrudState();

  useEffect(() => {
    dispatch(fetchProducts()).then((products) => setFormValues(products));
  }, []);

  if (isInitial(productsState.meta)) {
    return <Spinner />;
  }

  const onClickSave = () => {
    update('/api/inventory', formValues);
  };

  const handleChange = (productId) => (e) => {
    const { value } = e.target;
    const updated = formValues.map((p) => {
      if (p.id === productId) {
        return { ...p, quantity: +value };
      }
      return p;
    });
    setFormValues(updated);
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
        {formValues.map((p) => (
          <ListItem product={p} key={p.id} onChange={handleChange(p.id)} />
        ))}
      </Section>
    </React.Fragment>
  );
};

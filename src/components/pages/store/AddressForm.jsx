import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../common/Spinner';
import { SchemaForm } from '../../common/SchemaForm';
import { fetchSchema } from '../../../redux/schemas/actions';

export const AddressForm = (props) => {
  const { onSubmit } = props;
  const dispatch = useDispatch();

  const schemaState = useSelector((state) => state.schemas);
  if (!schemaState.data.addresses && !schemaState.meta.isFetching) {
    dispatch(fetchSchema('addresses'));
  }
  if (schemaState.meta.isFetching || !schemaState.data.addresses) {
    return <Spinner />;
  }
  return <SchemaForm schema={schemaState.data.addresses} onSubmit={onSubmit} />;
};

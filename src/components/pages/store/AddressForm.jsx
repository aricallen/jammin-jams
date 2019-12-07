import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../common/Spinner';
import { SchemaForm } from '../../common/SchemaForm';
import { fetchSchema } from '../../../redux/schemas/actions';

export const AddressForm = () => {
  const dispatch = useDispatch();
  const schemaState = useSelector((state) => state.schemas);
  useEffect(dispatch(fetchSchema('addresses')), []);
  if (schemaState.meta.isFetching || !schemaState.data.addresses) {
    return <Spinner />;
  }
  return <SchemaForm schema={schemaState.data.addresses} />;
};

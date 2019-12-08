import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../common/Spinner';
import { SchemaForm } from '../../common/SchemaForm';
import { fetchSchema } from '../../../redux/schemas/actions';

export const AddressForm = (props) => {
  const { onSubmit } = props;
  const dispatch = useDispatch();

  const schemaState = useSelector((state) => state.schemas);
  const { isFetching } = schemaState.meta;
  const fetchSchemas = () => {
    dispatch(fetchSchema('addresses'));
    dispatch(fetchSchema('users'));
  };
  useEffect(fetchSchemas, []);

  const hasAllData = !!schemaState.data.users && !!schemaState.data.addresses;

  if (isFetching || !hasAllData) {
    return <Spinner />;
  }

  const { users, addresses } = schemaState.data;
  const fields = [...users.fields, ...addresses.fields];
  return <SchemaForm schema={{ name: 'userInfo', fields }} onSubmit={onSubmit} />;
};

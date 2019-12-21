import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../common/Spinner';
import { SchemaForm } from '../../common/SchemaForm';
import { fetchSchema } from '../../../redux/schemas/actions';

const testValues = {
  firstName: 'jane',
  lastName: 'awesome',
  email: 'jane.awesome@gmail.com',
  address: '123 Jam dr',
  zipCode: '12345',
  city: 'awesome',
  state: 'CA',
  country: 'USA',
};

export const SubscriptionForm = (props) => {
  const { onSubmit, isBusy } = props;
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
  return (
    <SchemaForm
      schema={{ name: 'userInfo', fields }}
      onSubmit={onSubmit}
      isBusy={isBusy}
      defaultValues={testValues}
    />
  );
};

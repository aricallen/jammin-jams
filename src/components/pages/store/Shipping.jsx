import React, { useState, Fragment } from 'react';
import { startCase } from 'lodash';
import { FormInput } from '../../common/Forms';
import { Section, Header2 } from '../../common/Structure';

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

const FORM_FIELDS = ['firstName', 'lastName', 'address', 'address2', 'city', 'state'];
const REQUIRED_FIELDS = FORM_FIELDS.filter((field) => field !== 'address2');

export const isValid = (sessionData) => {
  return FORM_FIELDS.every((field) => sessionData[field] && sessionData[field].length > 0);
};

export const Shipping = (props) => {
  const { values, onUpdate } = props;

  const [internalValues, setInternalValues] = useState({});
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name) => (event) => {
    setTouched({ ...touched, [name]: true });
    if (touched[name] && internalValues[name] && internalValues[name].length === 0) {
      setErrors({ ...errors, [name]: 'This is a required field' });
    }
    const { value } = event.target;
    setInternalValues({ ...values, [name]: value });
    onUpdate({ [name]: value });
  };

  return (
    <Fragment>
      <Section>
        <Header2>Shipping Address</Header2>
      </Section>
      {FORM_FIELDS.map((field) => (
        <FormInput
          key={field}
          name={field}
          label={startCase(field)}
          value={values[field] || ''}
          error={errors[field]}
          onChange={handleChange(field)}
          type={field === 'email' ? 'email' : 'text'}
          isRequired={REQUIRED_FIELDS.includes(field)}
        />
      ))}
    </Fragment>
  );
};

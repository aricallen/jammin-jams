import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FormInput, Fieldset, Label, Form, FormError } from '../../common/Forms';
import { Checkbox } from '../../common/Checkbox';
import { Button as BaseButton } from '../../common/Button';
import { Select } from '../../common/Select';
import { spacing } from '../../../constants/style-guide';

const SubmitButton = styled(BaseButton)`
  margin-top: ${spacing.double}px;
`;

const SignupWrapper = styled('div')`
  padding-top: ${spacing.double}px;
`;

const SignupLabel = styled('label')`
  cursor: pointer;
  margin-right: ${spacing.double}px;
`;

const FREQUENCIES = ['Once a month', 'Once a quarter', 'Not sure / It depends'];

const PAIRED_WITH = [
  'Cheeses',
  'Nut butters',
  'Bread & butter',
  'Dairy (yogurt, ice cream, etc)',
  'Baked goods',
  'With a spoon (we get it)',
];

const makeOption = (val) => ({ label: val, value: val });

const frequencyOptions = FREQUENCIES.map(makeOption);

const pairedOptions = PAIRED_WITH.map(makeOption);

export const WaitlistForm = ({ onSubmit }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name, getValue = (e) => e.target.value) => (event) => {
    setValues({ ...values, [name]: getValue(event) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.preferredFrequency || values.preferredFrequency === '') {
      setErrors({ ...errors, preferredFrequency: 'Please select one' });
    } else {
      onSubmit(values);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput
        isRequired={true}
        name="firstName"
        value={values.firstName || ''}
        placeholder="Jane"
        onChange={handleChange('firstName')}
      />

      <FormInput
        isRequired={true}
        placeholder="Awesome"
        name="lastName"
        value={values.lastName || ''}
        onChange={handleChange('lastName')}
      />

      <FormInput
        isRequired={true}
        placeholder="jane.awesome@somemail.com"
        name="email"
        value={values.email || ''}
        type="email"
        onChange={handleChange('email')}
      />

      <FormInput
        isRequired={true}
        placeholder="12345"
        name="zipCode"
        value={values.zipCode || ''}
        onChange={handleChange('zipCode')}
      />

      <Fieldset className="required">
        <Label>Preferred Subscription Frequency</Label>
        <Select
          isRequired={true}
          name="preferredFrequency"
          value={values.preferredFrequency ? makeOption(values.preferredFrequency) : ''}
          options={frequencyOptions}
          onChange={handleChange('preferredFrequency', (option) => option.value)}
        />
        {errors.preferredFrequency && <FormError>{errors.preferredFrequency}</FormError>}
      </Fieldset>

      <Fieldset>
        <Label>I eat jam with... (one or more)</Label>
        <Select
          name="pairWith"
          value={values.pairWith ? makeOption(values.pairWith) : ''}
          options={pairedOptions}
          onChange={handleChange('pairWith', (options) => options.map((o) => o.value).join(', '))}
          isMulti={true}
          closeMenuOnSelect={false}
        />
      </Fieldset>

      <FormInput
        placeholder="peach"
        name="favoriteJam"
        value={values.favoriteJam || ''}
        onChange={handleChange('favoriteJam')}
      />

      <FormInput
        placeholder="onion"
        name="leastFavoriteJam"
        value={values.leastFavoriteJam || ''}
        onChange={handleChange('leastFavoriteJam')}
      />

      <FormInput
        label="Favorite Genre of Music"
        placeholder="techno"
        name="favoriteGenre"
        value={values.favoriteGenre || ''}
        onChange={handleChange('favoriteGenre')}
      />

      <SignupWrapper>
        <SignupLabel htmlFor="newsletterSignup">Sign up for our newletter?</SignupLabel>
        <Checkbox
          checked={values.newsletterSignup}
          name="newsletterSignup"
          onChange={handleChange('newsletterSignup', (e) => e.target.checked)}
        />
      </SignupWrapper>

      <SubmitButton type="submit">Sign me up!</SubmitButton>
    </Form>
  );
};

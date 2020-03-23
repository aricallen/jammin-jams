import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FormInput, Fieldset, Label, Form } from '../../common/Forms';
import { Button as BaseButton } from '../../common/Button';
import { Select } from '../../common/Select';
import { spacing } from '../../../constants/style-guide';

const SubmitButton = styled(BaseButton)`
  margin-top: ${spacing.double}px;
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

const frequencyOptions = FREQUENCIES.map((value) => ({
  label: value,
  value,
}));

const pairedOptions = PAIRED_WITH.map((value) => ({
  label: value,
  value,
}));

export const WaitlistForm = ({ onSubmit }) => {
  const [values, setValues] = useState({});

  const handleChange = (name, getValue = (e) => e.target.value) => (event) => {
    setValues({ ...values, [name]: getValue(event) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput
        isRequired={true}
        name="firstName"
        placeholder="Jane"
        onChange={handleChange('firstName')}
      />

      <FormInput
        isRequired={true}
        placeholder="Awesome"
        name="lastName"
        onChange={handleChange('lastName')}
      />

      <FormInput
        isRequired={true}
        placeholder="jane.awesome@somemail.com"
        name="email"
        type="email"
        onChange={handleChange('email')}
      />

      <FormInput
        isRequired={true}
        placeholder="12345"
        name="zipCode"
        onChange={handleChange('zipCode')}
      />

      <Fieldset className="required">
        <Label>Preferred Subscription Frequency</Label>
        <Select
          name="preferredFrequency"
          options={frequencyOptions}
          onChange={handleChange('preferredFrequency', (option) => option.value)}
        />
      </Fieldset>

      <Fieldset>
        <Label>I eat jam with... (one or more)</Label>
        <Select
          name="pairWith"
          options={pairedOptions}
          onChange={handleChange('pairWith', (options) => options.map((o) => o.value).join(', '))}
          isMulti={true}
          closeMenuOnSelect={false}
        />
      </Fieldset>

      <FormInput placeholder="peach" name="favoriteJam" onChange={handleChange('favoriteJam')} />

      <FormInput
        placeholder="onion"
        name="leastFavoriteJam"
        onChange={handleChange('leastFavoriteJam')}
      />

      <FormInput
        label="Favorite Genre of Music"
        placeholder="techno"
        name="favoriteGenre"
        onChange={handleChange('favoriteGenre')}
      />

      <SubmitButton type="submit">Sign me up!</SubmitButton>
    </Form>
  );
};

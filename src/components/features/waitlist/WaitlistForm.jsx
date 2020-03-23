import React, { useState } from 'react';
import styled from '@emotion/styled';
import useForm from 'react-hook-form';
import { Input, FormError, Fieldset, Label, Form } from '../../common/Forms';
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
  const { handleSubmit, errors, register } = useForm();
  const [selectValues, setSelectValues] = useState({});

  const handleChange = (name) => (value) => {
    if (Array.isArray(value)) {
      const serialized = value.map((option) => option.value).join(', ');
      setSelectValues({
        ...selectValues,
        [name]: serialized,
      });
    } else {
      setSelectValues({
        ...selectValues,
        [name]: value.value,
      });
    }
  };

  const _onSubmit = (values) => {
    onSubmit({ ...values, ...selectValues });
  };

  return (
    <Form onSubmit={handleSubmit(_onSubmit)}>
      <Fieldset className="required">
        <Label>First Name</Label>
        <Input
          placeholder="Jane"
          name="firstName"
          ref={register({
            required: true,
          })}
        />
        {errors.firstName && <FormError>This field is required.</FormError>}
      </Fieldset>

      <Fieldset className="required">
        <Label>Last Name</Label>
        <Input
          placeholder="Awesome"
          name="lastName"
          ref={register({
            required: true,
          })}
        />
        {errors.lastName && <FormError>This field is required.</FormError>}
      </Fieldset>

      <Fieldset className="required">
        <Label>Email</Label>
        <Input
          placeholder="jane.awesome@somemail.com"
          name="email"
          ref={register({
            required: true,
          })}
        />
        {errors.email && <FormError>This field is required.</FormError>}
      </Fieldset>

      <Fieldset className="required">
        <Label>Zip Code</Label>
        <Input
          placeholder="12345"
          name="zipCode"
          ref={register({
            required: true,
          })}
        />
        {errors.zipCode && <FormError>This field is required.</FormError>}
      </Fieldset>

      <Fieldset className="required">
        <Label>Preferred Subscription Frequency</Label>
        <Select
          name="preferredFrequency"
          options={frequencyOptions}
          onChange={handleChange('preferredFrequency')}
        />
      </Fieldset>

      <Fieldset>
        <Label>I eat jam with... (one or more)</Label>
        <Select
          name="pairWith"
          options={pairedOptions}
          onChange={handleChange('pairWith')}
          isMulti={true}
          closeMenuOnSelect={false}
        />
      </Fieldset>

      <Fieldset>
        <Label>Favorite Jam</Label>
        <Input placeholder="peach" name="favoriteJam" ref={register} />
      </Fieldset>

      <Fieldset>
        <Label>Least Favorite Jam</Label>
        <Input placeholder="onion" name="leastFavoriteJam" ref={register} />
      </Fieldset>

      <Fieldset>
        <Label>Favorite Genre of Music</Label>
        <Input placeholder="techno" name="favoriteGenre" ref={register} />
      </Fieldset>
      <SubmitButton type="submit">Sign me up!</SubmitButton>
    </Form>
  );
};

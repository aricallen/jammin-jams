import React from 'react';
import useForm from 'react-hook-form';
import { Input, FormError, Fieldset, Label, Form, Select } from './Forms';

const FieldType = {
  Select: 'select',
  Input: 'input',
  Checkbox: 'checkbox',
  Toggle: 'toggle',
};

const getFieldComp = (field) => {
  switch (field.type) {
    case FieldType.Select:
      return Select;
    default:
      return Input;
  }
};

const SchemaField = ({ field, errors, register }) => {
  const FieldComp = getFieldComp(field);
  return (
    <Fieldset className={field.required ? 'required' : null}>
      <Label>{field.label}</Label>
      <FieldComp
        {...field}
        ref={register({
          required: field.required,
        })}
      />
      {errors[field.name] && <FormError>This field is required.</FormError>}
    </Fieldset>
  );
};

export const SchemaForm = ({ schema, onSubmit }) => {
  const { handleSubmit, errors, register } = useForm();
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {schema.fields.map((field) => (
        <SchemaField field={field} errors={errors} register={register} />
      ))}
    </Form>
  );
};

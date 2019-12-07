import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { Input, FormError, Fieldset, Label, Form, Select } from './Forms';
import { Button } from './Button';

const FieldType = {
  Select: 'select',
  Input: 'input',
  Checkbox: 'checkbox',
  Toggle: 'toggle',
};

const renderSelect = (props) => {
  const { field, register, onChange, values } = props;
  const value = values[field.attrs.name];
  const valueOption = field.props.options.find((o) => o.value === value);
  return (
    <Select
      {...field.attrs}
      name={field.attrs.name}
      options={field.props.options}
      onChange={onChange}
      value={valueOption}
      innerRef={register({
        required: field.attrs.required,
      })}
    />
  );
};

const renderInput = (props) => {
  const { field, register, onChange, values } = props;
  const value = values[field.attrs.name];
  return (
    <Input
      {...props.field.attrs}
      ref={register({ required: field.attrs.required })}
      onChange={onChange}
      value={value || ''}
    />
  );
};

const renderFieldComp = (props) => {
  const { field } = props;
  switch (field.props.type) {
    case FieldType.Select:
      return renderSelect(props);
    default:
      return renderInput(props);
  }
};

const SchemaField = ({ field, errors, register, onChange, values }) => {
  return (
    <Fieldset className={field.attrs.required ? 'required' : null}>
      <Label>{field.props.label}</Label>
      {renderFieldComp({ field, register, onChange, values })}
      {errors[field.attrs.name] && <FormError>This field is required.</FormError>}
    </Fieldset>
  );
};

export const SchemaForm = ({ schema, onSubmit }) => {
  const { handleSubmit, errors, register } = useForm();
  const [values, setValues] = useState({});

  const handleChange = (name) => (event) => {
    const { value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {schema.fields.map((field) => (
        <SchemaField
          key={field.attrs.name}
          field={field}
          errors={errors}
          register={register}
          onChange={handleChange(field.attrs.name)}
          values={values}
        />
      ))}
      <Button>Submit</Button>
    </Form>
  );
};

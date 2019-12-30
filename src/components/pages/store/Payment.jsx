import React, { useEffect, useState } from 'react';
import { camelCase, startCase } from 'lodash';
import styled from '@emotion/styled';
import {
  Content,
  Header1,
  Section,
  Header2,
  Paragraph as BaseParagraph,
  Link,
} from '../../common/Structure';
import { initForm } from '../../../services/square';
import { FormInput, Label, Fieldset } from '../../common/Forms';
import { spacing, pallet } from '../../../constants/style-guide';

const FormContainer = styled('div')``;

const Paragraph = styled(BaseParagraph)`
  margin-bottom: ${spacing.double}px;
`;

const FormSection = styled(Section)`
  padding-top: ${spacing.double}px;
  margin-top: ${spacing.triple}px;
  border-top: 1px solid ${pallet.charcoal};
`;

const requiredFields = ['cardholderName', 'password', 'confirmPassword', 'billingAddress'];

export const isValid = (values) => {
  return requiredFields.every((field) => !!values[field]);
};

const getErrors = (values) => {
  const { password, confirmPassword } = values;
  if (password && password.length < 8) {
    return { password: 'Password must be at least 8 characters' };
  }
  if (confirmPassword && confirmPassword !== password) {
    return { confirmPassword: 'Passwords do not match' };
  }
  return {};
};

const ADDRESS_FIELDS = ['firstName', 'lastName', 'address', 'address2', 'city', 'state'];
const REQUIRED_FIELDS = ADDRESS_FIELDS.filter((field) => field !== 'address2');

export const Payment = (props) => {
  const { values, onUpdate } = props;
  const [errors, setErrors] = useState({});

  const init = () => {
    initForm();
  };

  useEffect(init, []);

  const handleChange = (name) => (event) => {
    const newValues = { ...values, [name]: event.target.value };
    onUpdate(newValues);
    setErrors(getErrors(newValues));
  };

  const cardholderName = values.firstName ? `${values.firstName} ${values.lastName}` : '';

  return (
    <Content>
      <Header1>Recurring Payment</Header1>
      <Section>
        <FormContainer>
          <Section>
            <Header2>User Account</Header2>
            <Paragraph>
              A user account will be created with your email. You may use this user account to view
              order status, update information, cancel etc. at a later time.
            </Paragraph>
            <FormInput
              name="email"
              error={errors.email}
              type="email"
              value={values.email || ''}
              placeholder="jane.awesome@somemail.com"
              onChange={handleChange('email')}
              isRequired={true}
            />
            <FormInput
              name="password"
              error={errors.password}
              type="password"
              label="Password (minimum 8 characters)"
              value={values.password || ''}
              onChange={handleChange('password')}
              placeholder="• • • • • • • •"
              isRequired={true}
            />
            <FormInput
              name="confirmPassword"
              error={errors.confirmPassword}
              type="password"
              value={values.confirmPassword || ''}
              onChange={handleChange('confirmPassword')}
              placeholder="• • • • • • • •"
              isRequired={true}
            />
          </Section>
          <FormSection>
            <Header2>Billing Address</Header2>
            {ADDRESS_FIELDS.map((field) => (
              <FormInput
                key={field}
                label={startCase(field)}
                name={camelCase(`billing_${field}`)}
                value={values[field] || ''}
                error={errors[field]}
                onChange={handleChange(camelCase(`billing_${field}`))}
                isRequired={REQUIRED_FIELDS.includes(field)}
              />
            ))}
          </FormSection>
          <FormSection>
            <Header2>Credit Card</Header2>
            <Paragraph>
              Jammin Jams does not retain any credit card information directly. We leverage Square
              for our payments. Visit{' '}
              <Link href="https://squareup.com/us/en/security">Square Security</Link> for more
              information.
            </Paragraph>

            <FormInput
              name="cardholderName"
              value={cardholderName}
              onChange={handleChange('cardholderName')}
              placeholder="Card Holder Full Name (e.g. Jane Awesome)"
              isRequired={true}
            />
            <Fieldset className="required">
              <Label>Card Number</Label>
              <div id="sq-card-number" />
            </Fieldset>
            <Fieldset className="required">
              <Label>Expiration Date</Label>
              <div id="sq-expiration-date" />
            </Fieldset>
            <Fieldset className="required">
              <Label>CVV</Label>
              <div id="sq-cvv" />
            </Fieldset>
            <Fieldset className="required">
              <Label>Zip Code</Label>
              <div id="sq-zip-code" />
            </Fieldset>
          </FormSection>
        </FormContainer>
      </Section>
    </Content>
  );
};

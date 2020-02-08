import React, { useEffect, useState } from 'react';
import { startCase } from 'lodash';
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
import { FormInput, Label, Fieldset, FormError } from '../../common/Forms';
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

const ADDRESS_FIELDS = ['billingAddress', 'billingAddress2', 'billingCity', 'billingState'];
const PLACHOLDERS = {
  billingAddress: '123 Jam Dr.',
  billingAddress2: 'Unit 42',
  billingCity: 'Awesomeville',
  billingState: 'CA',
};
const OPTIONAL_FIELDS = ['billingAddress2'];
const REQUIRED_FIELDS = [
  'cardholderName',
  'password',
  'confirmPassword',
  ...ADDRESS_FIELDS.filter((f) => !OPTIONAL_FIELDS.includes(f)),
];

export const isValid = (values) => {
  return REQUIRED_FIELDS.every((field) => !!values[field]);
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

export const Payment = (props) => {
  const { values, onUpdate, backendErrors } = props;
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

  const cardholderName = values.firstName ? `${values.firstName} ${values.lastName}` : null;

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
            {ADDRESS_FIELDS.map((field) => {
              const label = startCase(field.replace('billing', ''));
              return (
                <FormInput
                  key={field}
                  label={label}
                  name={field}
                  value={values[field] || ''}
                  error={errors[field]}
                  onChange={handleChange(field)}
                  isRequired={REQUIRED_FIELDS.includes(field)}
                  placeholder={PLACHOLDERS[field]}
                />
              );
            })}
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
              value={cardholderName || values.cardholderName || ''}
              onChange={handleChange('cardholderName')}
              placeholder="Card Holder Full Name (e.g. Jane Awesome)"
              isRequired={true}
            />
            <Fieldset className="required">
              <Label>Card Number</Label>
              <div id="sq-card-number" />
              {backendErrors.cardNumber && <FormError>{backendErrors.cardNumber}</FormError>}
            </Fieldset>
            <Fieldset className="required">
              <Label>Expiration Date</Label>
              <div id="sq-expiration-date" />
              {backendErrors.expirationDate && (
                <FormError>{backendErrors.expirationDate}</FormError>
              )}
            </Fieldset>
            <Fieldset className="required">
              <Label>CVV</Label>
              <div id="sq-cvv" />
              {backendErrors.cvv && <FormError>{backendErrors.cvv}</FormError>}
            </Fieldset>
            <Fieldset className="required">
              <Label>Zip Code</Label>
              <div id="sq-zip-code" />
              {backendErrors.billingZipCode && (
                <FormError>{backendErrors.billingZipCode}</FormError>
              )}
            </Fieldset>
          </FormSection>
        </FormContainer>
      </Section>
    </Content>
  );
};

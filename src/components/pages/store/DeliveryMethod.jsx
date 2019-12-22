import React from 'react';
import styled from '@emotion/styled';
import { Fieldset, Label, FormInput, Select } from '../../common/Forms';
import { VALID_ZIPCODES } from './constants';
import { Section, Header2 } from '../../common/Structure';
import { spacing } from '../../../constants/style-guide';

const SectionHeader = styled(Header2)`
  margin-bottom: ${spacing.double}px;
`;

const Method = {
  PROMO: 'promo',
  BICYCLE: 'bicycle',
};

const isInvalidZip = (val) => {
  return val && val.length >= 5 && VALID_ZIPCODES.includes(val) === false;
};

const OPTIONS = [
  {
    label: 'Bicycle',
    value: Method.BICYCLE,
  },
  {
    label: 'Special (requires promo code)',
    value: Method.PROMO,
  },
];

const isValid = (values = {}) => {
  const { zipCode, deliveryMethod, deliveryPromoCode } = values;
  if (deliveryMethod === Method.PROMO) {
    return deliveryPromoCode && deliveryPromoCode.length > 0;
  }
  if (deliveryMethod === Method.BICYCLE) {
    return zipCode && zipCode.length > 0 && !isInvalidZip(zipCode);
  }
  return true;
};

export const DeliveryMethod = (props) => {
  const { values, onUpdate } = props;

  const { zipCode, deliveryMethod, deliveryPromoCode } = values;

  const zipError = isInvalidZip(zipCode)
    ? 'Unfortunately, we currently do not service this zip code. If you have a promo code for free delivery enter that now.'
    : null;

  const showPromo = deliveryMethod && deliveryMethod === Method.PROMO;
  const showZip = deliveryMethod && deliveryMethod === Method.BICYCLE;

  const handleChange = (name, getValue) => (event) => {
    const newVal = getValue(event);
    const fieldVal = { [name]: newVal };
    onUpdate(fieldVal, isValid({ ...values, ...fieldVal }));
  };

  return (
    <Section>
      <SectionHeader>Delivery</SectionHeader>
      <Fieldset className="required">
        <Label>Method</Label>
        <Select
          name="deliveryMethod"
          options={OPTIONS}
          onChange={handleChange('deliveryMethod', (option) => option.value)}
          value={OPTIONS.find((o) => o.value === deliveryMethod)}
        />
      </Fieldset>
      {showPromo && (
        <FormInput
          name="deliveryPromoCode"
          value={deliveryPromoCode}
          onChange={handleChange('deliveryPromoCode', (e) => e.target.value)}
          label="Promo Code"
          isRequired={true}
        />
      )}
      {showZip && (
        <FormInput
          name="zipCode"
          value={zipCode}
          onChange={handleChange('zipCode', (e) => e.target.value)}
          label="Zip Code"
          isRequired={true}
          error={zipCode && zipError}
        />
      )}
    </Section>
  );
};

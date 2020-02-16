import React, { Fragment } from 'react';
import { Fieldset, Label, FormInput } from '../../common/Forms';
import { VALID_ZIPCODES } from './constants';
import { Select } from '../../common/Select';

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

export const isValid = (values = {}) => {
  const { zipCode, deliveryMethod, deliveryPromoCode } = values;
  if (!deliveryMethod) {
    return false;
  }

  if (deliveryMethod === Method.PROMO) {
    return deliveryPromoCode && deliveryPromoCode.length > 0;
  }

  if (deliveryMethod === Method.BICYCLE) {
    return zipCode && zipCode.length === 5 && !isInvalidZip(zipCode);
  }
  return true;
};

export const DeliveryMethod = (props) => {
  const { values, onUpdate } = props;

  const { zipCode, deliveryMethod, deliveryPromoCode } = values;

  const zipError = isInvalidZip(zipCode)
    ? 'Unfortunately, we currently do not service this zip code. If you have a promo code for bicycle delivery enter that now.'
    : null;

  const showPromo = deliveryMethod && deliveryMethod === Method.PROMO;
  const showZip = deliveryMethod && deliveryMethod === Method.BICYCLE;

  const handleChange = (name, getValue) => (event) => {
    const newVal = getValue(event);
    const newValues = { ...values, [name]: newVal };
    onUpdate(name, newVal, isValid(newValues));
  };

  return (
    <Fragment>
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
          value={deliveryPromoCode || ''}
          onChange={handleChange('deliveryPromoCode', (e) => e.target.value)}
          label="Promo Code"
          isRequired={true}
        />
      )}
      {showZip && (
        <FormInput
          name="zipCode"
          value={zipCode || ''}
          onChange={handleChange('zipCode', (e) => e.target.value)}
          label="Zip Code"
          isRequired={true}
          error={zipCode && zipError}
        />
      )}
    </Fragment>
  );
};

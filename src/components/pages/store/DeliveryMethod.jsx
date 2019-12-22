import React from 'react';
import styled from '@emotion/styled';
import { Fieldset, Label, FormInput, Select } from '../../common/Forms';
import { VALID_ZIPCODES } from './constants';
import { Section, Header2 } from '../../common/Structure';
import { spacing } from '../../../constants/style-guide';

const SectionHeader = styled(Header2)`
  margin-bottom: ${spacing.double}px;
`;

const PROMO_METHOD = 'promo';

const isInvalidZip = (val) => {
  return val && val.length >= 5 && VALID_ZIPCODES.includes(val) === false;
};

const OPTIONS = [
  {
    label: 'Bicycle',
    value: 'bicycle',
  },
  {
    label: 'Special (requires promo code)',
    value: PROMO_METHOD,
  },
];

export const DeliveryMethod = (props) => {
  const { formValues, formErrors, onUpdate } = props;

  const zipError = isInvalidZip(formValues.zipCode)
    ? 'Unfortunately, we currently do not service this zip code. If you have a promo code for free delivery enter that now.'
    : null;

  const showPromo = formValues.method === PROMO_METHOD;

  return (
    <Section>
      <SectionHeader>Delivery</SectionHeader>
      <Fieldset className="required">
        <Label>Method</Label>
        <Select
          name="deliveryMethod"
          options={OPTIONS}
          onChange={(option) => onUpdate({ deliveryMethod: option.value })}
          value={OPTIONS.find((o) => o.value === formValues.deliveryMethod)}
        />
      </Fieldset>
      {showPromo && (
        <FormInput
          name="deliveryPromoCode"
          value={formValues.zipCode}
          onChange={(e) => onUpdate({ deliveryPromoCode: e.target.value })}
          label="Promo Code"
          isRequired={true}
          error={formErrors.deliveryPromoCode}
        />
      )}
      <FormInput
        name="zipCode"
        value={formValues.zipCode}
        onChange={(e) => onUpdate({ zipCode: e.target.value })}
        label="Zip Code"
        isRequired={true}
        error={formErrors.zipCode && zipError}
      />
    </Section>
  );
};

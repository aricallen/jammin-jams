import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FormInput } from '../../common/Forms';
import { VALID_ZIPCODES } from './constants';
import { Section, Header2 } from '../../common/Structure';
import { spacing } from '../../../constants/style-guide';

const FormWrapper = styled('div')`
  height: auto;
`;

const SectionHeader = styled(Header2)`
  margin-bottom: ${spacing.double}px;
`;

const isInvalidZip = (val) => {
  return val && val.length === 5 && VALID_ZIPCODES.includes(val) === false;
};

export const DeliveryMethod = (props) => {
  const { sessionState, values } = props;
  // const isBusy = sessionState.isUpdating;
  const [zipCode, setZipCode] = useState(values ? values.zipCode : '');

  const zipError = isInvalidZip(zipCode)
    ? 'Unfortunately, we currently do not service this zip code. If you have a promo code for free delivery enter that now.'
    : null;

  return (
    <Section>
      <SectionHeader>Delivery Method</SectionHeader>
      <FormWrapper>
        <FormInput
          name="zipCode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          label="Zip Code"
          isRequired={true}
          error={zipError}
        />
      </FormWrapper>
    </Section>
  );
};

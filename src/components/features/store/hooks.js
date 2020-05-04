import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { pick } from 'lodash';

const getDefaultValues = () => {
  if (isBetaTester()) {
    return SessionStorage.getItem(BETA_CHECKOUT_SESSION_KEY, {});
  }
  return {};
};

/**
 * deliver:
 *
 * deliveryMethod
 * deliveryExceptionCode
 *
 * shipping:
 *
 * firstName
 * lastName
 * address
 * address2
 * zipCode
 * shippingInstructions
 */

const parseFormValues = (user = {}) => {
  const { firstName, lastName, paymentCustomer } = pick(user, [
    'firstName',
    'lastName',
    'paymentCustomer',
  ]);
  const address = paymentCustomer?.shipping?.address?.line1 || '';
  const address2 = paymentCustomer?.shipping?.address?.line2 || '';
  const zipCode = paymentCustomer?.shipping?.address?.postalCode || '';
  const shippingInstructions = paymentCustomer?.metadata?.shippingInstructions || '';
  return { firstName, lastName, address, address2, zipCode, shippingInstructions };
};

export const useCheckoutFormValues = () => {
  const user = useSelector((state) => state.session.data?.user);
  const defaultValues = parseFormValues(user);
  const [values, setValues] = useState(defaultValues);
  return [values, setValues];
};

import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { Fieldset, Label, FormInput } from '../../common/Forms';
import { VALID_ZIPCODES, Method } from './constants';
import { Select } from '../../common/Select';
import { spacing } from '../../../constants/style-guide';
import { CouponCodeForm } from './CouponCodeForm';
import { fetchCoupon } from '../../../redux/coupons/actions';

const Wrapper = styled('div')``;
const InputsWrapper = styled('div')`
  padding-top: ${spacing.regular}px;
`;
const ImageWrapper = styled('div')`
  padding-top: ${spacing.regular}px;
  padding-bottom: ${spacing.regular}px;
`;
const StyledImage = styled('img')``;
const Description = styled('span')`
  margin-bottom: ${spacing.regular}px;
`;
const ErrorMessage = styled(Description)`
  color: red;
`;
const MailToWrapper = styled('div')`
  margin-bottom: ${spacing.regular}px;
`;

const isInvalidZip = (val) => {
  return val && val.length >= 5 && VALID_ZIPCODES.includes(val) === false;
};

const OPTIONS = [
  {
    label: 'Bicycle',
    value: Method.BICYCLE,
  },
  {
    label: 'Special (requires exception code)',
    value: Method.PROMO,
  },
];

export const isValid = (values = {}) => {
  const { zipCode, deliveryMethod, deliveryExceptionCode } = values;
  if (!deliveryMethod) {
    return false;
  }

  if (deliveryMethod === Method.PROMO) {
    return deliveryExceptionCode && deliveryExceptionCode.length > 0;
  }

  if (deliveryMethod === Method.BICYCLE) {
    return zipCode && zipCode.length === 5 && !isInvalidZip(zipCode);
  }
  return true;
};

const RequestZipCode = ({ zipError, zipCode }) => {
  if (!zipError) {
    return null;
  }

  const subject = `Please expand to cover my zip code: ${zipCode}`;
  const body = `Hi Jammin' Jams, can you start servicing zip code ${zipCode}&#63; K Thanks.<p>Your friend,</p><br />[INSERT_NAME_HERE]`;
  const mailTo = `mailto:jam@jmnjams.com?subject=${subject}&body=${body}`;

  return (
    <MailToWrapper>
      <ErrorMessage>
        Unfortunately, we do not service this zip code at the moment. If this is a mistake, or you
        would like to request your zip code be added to our service, send us an email at{' '}
        <a href={mailTo}>jam@jmnjams.com</a>.
      </ErrorMessage>
    </MailToWrapper>
  );
};

export const DeliveryMethod = (props) => {
  const dispatch = useDispatch();
  const couponsState = useSelector((state) => state.coupons);
  const { values, onUpdate, setIsValid } = props;

  const { zipCode, deliveryMethod = Method.BICYCLE, deliveryExceptionCode } = values;

  const zipError = isInvalidZip(zipCode)
    ? 'Unfortunately, we do not service this zip code at the moment.'
    : null;

  const showPromo = deliveryMethod && deliveryMethod === Method.PROMO;
  const showZip = deliveryMethod && deliveryMethod === Method.BICYCLE;

  const handleChange = (name, getValue) => (event) => {
    const newVal = getValue(event);
    onUpdate(name, newVal);
  };

  const foundCoupon = couponsState.data.find((coupon) => coupon.name === deliveryExceptionCode);
  if (deliveryMethod === Method.PROMO) {
    setIsValid(isValid(values) && foundCoupon);
  } else {
    setIsValid(isValid(values) && !zipError);
  }

  const onApplyException = (e) => {
    e.preventDefault();
    dispatch(fetchCoupon(values.deliveryExceptionCode, 'delivery'));
  };

  return (
    <Wrapper>
      <Description>
        For our initial launch, we will only be delivering via bicycle in the areas seen in the map.
        If you have an exeption code, choose &ldquo;Special&rdquo; as your method and enter it
        below.
      </Description>
      <InputsWrapper>
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
          <CouponCodeForm
            couponsState={couponsState}
            fieldName="deliveryExceptionCode"
            onUpdate={onUpdate}
            values={values}
            onApply={onApplyException}
            couponType="delivery"
          />
        )}
        {showZip && (
          <Fragment>
            <FormInput
              name="zipCode"
              value={zipCode || ''}
              placeholder="12345"
              onChange={handleChange('zipCode', (e) => e.target.value)}
              label="Zip Code"
              isRequired={true}
            />
            <RequestZipCode zipError={zipError} zipCode={zipCode} />
          </Fragment>
        )}
      </InputsWrapper>
      {showZip && (
        <Fragment>
          <Description>
            <b>Service Area</b>
          </Description>
          <ImageWrapper>
            <StyledImage src="/assets/images/service-territory.png" />
          </ImageWrapper>
        </Fragment>
      )}
    </Wrapper>
  );
};

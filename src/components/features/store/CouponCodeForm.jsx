import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { startCase } from 'lodash';
import { spacing, pallet } from '../../../constants/style-guide';
import { Button } from '../../common/Button';
import { Input } from '../../common/Forms';
import { isResolved, isBusy } from '../../../redux/utils/meta-status';

const CouponMessage = styled('div')`
  margin-top: ${spacing.double}px;
  color: ${pallet.strawberry};
  text-align: center;
`;

const Label = styled('label')`
  white-space: nowrap;
  margin-right: ${spacing.double}px;
`;

const ButtonWrapper = styled('div')`
  margin-top: ${spacing.double}px;
  display: flex;
  justify-content: flex-end;
`;
const InputsRow = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin-top: ${spacing.double}px;
`;

const Feedback = styled('div')`
  margin-right: ${spacing.quadruple}px;
`;
const ActionsRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const InputsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const CouponCodeForm = (props) => {
  const { couponsState, onUpdate, values, onApply, fieldName = 'couponCode', couponType } = props;

  const showUnknownCouponMessage = isResolved(couponsState.meta) && couponsState.data.length === 0;

  const showAppliedCouponMessage =
    isResolved(couponsState.meta) &&
    couponsState.data.find((coupon) => coupon.metadata.type === couponType);

  if (showAppliedCouponMessage) {
    return <CouponMessage>Code applied successfully.</CouponMessage>;
  }

  const couponCode = values[fieldName];

  return (
    <Fragment>
      <InputsRow>
        <InputsWrapper>
          <Label htmlFor={fieldName}>Apply {startCase(fieldName)}: </Label>
          <Input
            name={fieldName}
            onChange={(e) => onUpdate(fieldName, e.target.value)}
            value={couponCode || ''}
          />
        </InputsWrapper>
      </InputsRow>
      <ActionsRow>
        <Feedback>
          {showUnknownCouponMessage && <CouponMessage>Unknown coupon code... 🤔</CouponMessage>}
          {showAppliedCouponMessage && <CouponMessage>Coupon code has been applied.</CouponMessage>}
        </Feedback>
        <ButtonWrapper>
          <Button onClick={onApply} isBusy={isBusy(couponsState.meta)}>
            Apply
          </Button>
        </ButtonWrapper>
      </ActionsRow>
    </Fragment>
  );
};

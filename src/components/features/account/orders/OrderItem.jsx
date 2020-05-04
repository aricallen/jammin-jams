import React from 'react';
import { startCase } from 'lodash';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import { Label } from '../../../common/Forms';
import { spacing, border } from '../../../../constants/style-guide';
import { formatAmount } from '../../../../utils/format-helpers';

const ReceiptLink = styled('a')`
  cursor: pointer;
`;

const Wrapper = styled('div')`
  padding: ${spacing.double}px;
  border-top: ${border};
`;

const Row = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.regular}px;
`;

const Value = styled('span')`
  padding-left: ${spacing.regular}px;
`;

/**
 * amount_paid
 * created
 * receipt_number
 * status: "paid"
 * total:
 * discount: null
 */

const parseOrder = (order) => {
  const createdDate = new Date(order.created * 1000);
  return {
    ...(order.metadata.product && { product: order.metadata.product }),
    ...(order.metadata.discount && { discount: `$${formatAmount(order.metadata.discount)}` }),
    ...(order.metadata.couponName && { coupon: order.metadata.couponName }),
    total: `$${formatAmount(order.amount)}`,
    status: order.status,
    completed: format(createdDate, 'MMM do HH:mm a'),
  };
};

export const OrderItem = ({ order }) => {
  const parsed = parseOrder(order);
  return (
    <Wrapper>
      {Object.entries(parsed).map(([key, value]) => (
        <Row key={key}>
          <Label>{startCase(key)}: </Label>
          <Value>{value}</Value>
        </Row>
      ))}
      <ReceiptLink
        href={order?.charges?.data[0]?.receiptUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Receipt
      </ReceiptLink>
    </Wrapper>
  );
};

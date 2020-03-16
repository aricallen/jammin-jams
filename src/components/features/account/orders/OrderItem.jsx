import React from 'react';
import { pick, startCase } from 'lodash';
import styled from '@emotion/styled';
import { Label } from '../../../common/Forms';
import { spacing, border } from '../../../../constants/style-guide';
import { formatAmount } from '../../../../utils/format-helpers';

const ReceiptLink = styled('a')`
  cursor: pointer;
`;

const Wrapper = styled('div')`
  padding: ${spacing.double}px;
  border-bottom: ${border};
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
  const fields = pick(order, ['amount_paid', 'receipt_number', 'status']);
  return {
    ...fields,
    total: formatAmount(order.total),
    discount: formatAmount(order.discount),
    completed: new Date(order.created * 1000).toString(),
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

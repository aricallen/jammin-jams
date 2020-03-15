import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled('div')``;

export const OrderItem = ({ order }) => {
  return <Wrapper>{order.name}</Wrapper>;
};

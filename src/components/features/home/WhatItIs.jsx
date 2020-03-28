import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { getNextDeliveryDay } from '../../../utils/delivery-helpers';
import { Emphasis } from '../../common/Structure';

const Text = styled('span')``;

export const WhatItIs = () => (
  <Text>
    We created Jammin&apos; Jams with the intent of celebrating all that is happy in life by doing
    what we love. Jam invites us to live in the present moment. We aim to transform the best
    seasonal fruits into sweet-tart-oh-so-tasty jam through the power of high heat and bass. At
    Jammin&apos; Jams, we firmly believe that fun and passion can be tasted. This is why we will
    always play a live DJ set while making jam in our home kitchen. We keep our hearts pumping and
    our jams jammin with funky techno beats, and we hope you’ll do the same!{' '}
    <Link to="/store">
      <Emphasis>Sign up today</Emphasis>
    </Link>{' '}
    to get your first jar delivered <Emphasis>{getNextDeliveryDay()}</Emphasis>.
  </Text>
);

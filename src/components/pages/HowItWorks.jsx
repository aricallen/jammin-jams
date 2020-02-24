import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { OrderedList, ListItem } from '../common/Structure';

export const HowItWorks = () => {
  return (
    <Fragment>
      <OrderedList>
        <ListItem>
          Sign up for a jam subscription - You specify the preferred frequency of delivery: every
          month, two months, or three months. Flavor picks are on us! They will depend on what
          produce is in season and looks extra juicy at the market.
        </ListItem>
        <ListItem>
          You will receive an email that notifies you of the upcoming delivery at least one week in
          advance - We also have a delivery calendar you can access any time (LINK)
        </ListItem>
        <ListItem>
          Get yourself a spoon, and some dancing shoes. Jam is in the near future!! Scan the QR code
          on each label to pair with the music we jammed while jammin. And then tell us, what fun
          are you looking forward to this month?
        </ListItem>
      </OrderedList>
    </Fragment>
  );
};

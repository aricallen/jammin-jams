import React, { Fragment } from 'react';
import { Header1, Link } from '../../common/Structure';
import { Article } from '../../common/Article';
import { BulletList } from '../../common/BulletList';

const SignUp = () => (
  <Fragment>
    Sign up for a jam subscription - You specify the preferred frequency of delivery: every month,
    two months, or three months. Flavor picks are on us! They will depend on what produce is in
    season and looks extra juicy at the market.
  </Fragment>
);

const Delivery = () => (
  <Fragment>
    You will receive an email that notifies you of the upcoming delivery at least one week in
    advance - We also have a <Link to="/delivery-calendar">delivery calendar</Link> you can access
    any time.
  </Fragment>
);

const GetASpoon = () => (
  <Fragment>
    Get yourself a spoon, and some dancing shoes. Jam is in the near future!! Scan the QR code on
    each label to pair with the music we jammed while jammin. And then{' '}
    <a href="mailto:jam@jmnjams.com">tell us</a>, what fun are you looking forward to this month?
  </Fragment>
);

export const HowItWorksList = () => {
  return <BulletList contentItems={[SignUp, Delivery, GetASpoon]} />;
};

const HowItWorksContent = () => {
  return (
    <Fragment>
      <Header1>How It Works</Header1>
      <HowItWorksList />
    </Fragment>
  );
};

export const HowItWorks = () => {
  return <Article Middle={HowItWorksContent} />;
};

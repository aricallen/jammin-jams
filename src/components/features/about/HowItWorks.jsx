import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Header1, Emoji, Emphasis, UnorderedList, ListItem } from '../../common/Structure';
import { Article } from '../../common/Article';
import { spacing, border } from '../../../constants/style-guide';
import { fontSizes } from '../../../utils/style-helpers';

const SignUp = () => (
  <Fragment>
    You specify the preferred frequency of delivery:
    <UnorderedList style={{ paddingLeft: 20 }}>
      <ListItem>Every month</ListItem>
      <ListItem>Every two months</ListItem>
      <ListItem>Every three months</ListItem>
    </UnorderedList>
    Flavor picks are on us! They will depend on what produce is in season and looks extra juicy at
    the market.
  </Fragment>
);

const Delivery = () => (
  <Fragment>
    You will receive an email that notifies you of the upcoming delivery at least one week in
    advance - We also have a <Link to="/about/delivery-calendar">delivery calendar</Link> you can
    access any time.
  </Fragment>
);

const GetASpoon = () => (
  <Fragment>
    Get yourself a spoon, and some dancing shoes. Jam is in the near future!! Scan the QR code on
    each label to pair with the music we jammed while jammin. And then{' '}
    <a href="mailto:jam@jmnjams.com">tell us</a>, what fun are you looking forward to this month?
  </Fragment>
);

const STEPS = [
  {
    title: 'Sign up',
    emoji: '👋🏽',
    Content: SignUp,
  },
  {
    title: 'Delivery',
    emoji: '🚲',
    Content: Delivery,
  },
  {
    title: 'Get ready to jam',
    emoji: '🎧',
    Content: GetASpoon,
  },
];

const Card = styled('div')`
  border: ${border};
`;

const CardWrapper = styled('div')`
  margin-bottom: ${spacing.quadruple}px;
`;

const CardHeader = styled('div')`
  display: flex;
  justify-content: center;
  padding: ${spacing.regular}px;
  border-bottom: ${border};
`;
const Title = styled('span')`
  margin-left: ${spacing.regular}px;
`;
const CardContent = styled('div')`
  padding: ${spacing.double}px;
`;

const ContentCard = ({ title, emoji, Content }) => {
  return (
    <Card>
      <CardHeader>
        <Emoji>{emoji}</Emoji>
        <Title>
          <Emphasis>{title}</Emphasis>
        </Title>
      </CardHeader>
      <CardContent>
        <Content />
      </CardContent>
    </Card>
  );
};

export const ContentList = () => {
  return STEPS.map((step) => (
    <CardWrapper key={step.title}>
      <ContentCard {...step} />
    </CardWrapper>
  ));
};

const ContentHeader = styled(Header1)`
  ${fontSizes('largest')}
`;

const HowItWorksContent = () => {
  return (
    <Fragment>
      <ContentHeader>How It Works</ContentHeader>
      <ContentList />
    </Fragment>
  );
};

export const HowItWorks = () => {
  return <Article Middle={HowItWorksContent} />;
};

import React, { Fragment, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Header1, Emphasis, UnorderedList, ListItem } from '../../common/Structure';
import { Article } from '../../common/Article';
import { spacing, border } from '../../../constants/style-guide';
import { fontSizes } from '../../../utils/style-helpers';
import { media } from '../../../utils/media';
import { setMetaTags } from '../../../utils/set-meta-tags';

const SignUp = () => (
  <Fragment>
    You specify the preferred frequency of delivery:
    <UnorderedList style={{ paddingLeft: spacing.quadruple }}>
      <ListItem>Every month</ListItem>
      <ListItem>Every two months</ListItem>
      <ListItem>Every three months</ListItem>
    </UnorderedList>
    <p style={{ marginTop: spacing.regular }}>
      Flavor picks are on us! They will depend on what produce is in season and looks extra juicy at
      the market.
    </p>
  </Fragment>
);

const Delivery = () => (
  <Fragment>
    You will receive an email that notifies you of the upcoming delivery at least one week in
    advance - We also have a <Link to="/p/about/delivery-calendar">delivery calendar</Link> you can
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
    title: 'Jam',
    emoji: '🎧',
    Content: GetASpoon,
  },
];

const Card = styled('div')``;

const CardWrapper = styled('div')`
  margin-bottom: ${spacing.quadruple}px;
`;

const CardHeader = styled('div')`
  border-bottom: ${border};
  ${fontSizes('largest')}
`;
const Title = styled('div')``;
const CardContent = styled('div')`
  flex-grow: 2;
  padding: ${spacing.double}px;
  ${media.desktop()} {
    padding-left: ${spacing.quadruple * 2}px;
  }
`;

const ContentCard = ({ title, index, Content }) => {
  return (
    <Card>
      <CardHeader>
        <Title>
          Step {index + 1} -- <Emphasis>{title}</Emphasis>
        </Title>
      </CardHeader>
      <CardContent>
        <Content />
      </CardContent>
    </Card>
  );
};

export const ContentList = () => {
  return STEPS.map((step, i) => (
    <CardWrapper key={step.title}>
      <ContentCard {...step} index={i} />
    </CardWrapper>
  ));
};

const ContentHeader = styled(Header1)`
  ${fontSizes('largest')}
`;

const HowItWorksMiddle = () => {
  useEffect(() => {
    setMetaTags('/p/about/how-it-works');
  }, []);
  return (
    <Fragment>
      <ContentHeader>How It Works</ContentHeader>
      <ContentList />
    </Fragment>
  );
};

export const HowItWorks = () => {
  return <Article Middle={HowItWorksMiddle} />;
};

import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Section, Paragraph, Emoji, Emphasis } from '../../common/Structure';
import { font, spacing } from '../../../constants/style-guide';
import { fontSizes } from '../../../utils/style-helpers';
import { Article } from '../../common/Article';

const Question = styled('h4')`
  ${fontSizes('regular')}
  font-weight: ${font.weight.semiBold};
`;

const Answer = styled(Paragraph)``;

const MailToLink = () => {
  return <a href="mailto:jam@jmnjams.com">jam@jmnjams.com</a>;
};

export const Questions = () => {
  return (
    <Fragment>
      <Section style={{ marginTop: 0 }}>
        <Question>I want to change my subscription delivery frequency.</Question>
        <Question>I am moving! Will you deliver to my new address?!</Question>
        <Question>I want to change my payment method.</Question>
        <Answer>
          We will do our best to accommodate life changes. While we work on automating the process,
          please contact us at <MailToLink /> and tell us what you need.
        </Answer>
      </Section>

      <Section>
        <Question>
          Why only offer a subscription? I love your jam, but I just want to buy a jar...
        </Question>
        <Answer>
          First of all, <Emphasis>THANK YOU</Emphasis> for loving our jam! We love you back! Our jam
          production is on such a small scale that we are currently unable to support
          non-subscription orders. With that said, you should join our newsletter to be the first
          one to know when that changes.
        </Answer>
      </Section>

      <Section>
        <Question>Where do you source your ingredients? Are they organic?</Question>
        <Answer>
          Sourcing our ingredients is half of the fun! We scout local markets and farmer’s markets
          on the regular. We are working towards 100% of our fruit to come from organic farms by the
          end of the year. Our dream is to build relationships with local organic farmers and make
          the best quality jam that exists while supporting our neighbor growers (and make friends
          in the process!).
        </Answer>
      </Section>

      <Section>
        <Question>Do you have sugar-free jam?</Question>
        <Answer>No.</Answer>
      </Section>

      <Section>
        <Question>Why do you only offer techno music?</Question>
        <Answer>
          Techno holds a special place in our hearts and something magical happens when pairing it
          with our jam making. With that said, we are open to anything groovy and would love to
          expand our music curations. Stay tuned for guest DJs and musician sessions. Are you a DJ,
          musician, or music producer, or similar aficionado?{' '}
          <a href="mailto:jmn@jmnjams.com">Share your favorites with us</a> and we may feature you
          in the future <Emoji label="heart">❤️</Emoji>
        </Answer>
      </Section>

      <Section style={{ marginBottom: spacing.quadruple }}>
        <Question>Your FAQs did not answer my question.</Question>
        <Answer>
          Oh my! Email us at <MailToLink /> and we’ll get back to you asap!
        </Answer>
      </Section>
    </Fragment>
  );
};

export const FreqAsked = () => {
  return <Article Middle={Questions} />;
};

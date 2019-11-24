import React from 'react';
import styled from '@emotion/styled';
import { Content, Header1, Section, Paragraph, Emphasis, Emoji } from '../common/Structure';

const ContentWrapper = styled(Content)`
  margin: 0 auto;
  width: 80%;
  animation: fade-in 0.5s 1;
`;

export const WelcomeForm = () => {
  return (
    <ContentWrapper>
      <Header1>Welcome to Jammin&apos; Jams! We are <Emphasis>so stoked</Emphasis> that you are here.</Header1>
      <Section>
        <Paragraph>
          We created Jammin&apos; Jams with the intent of celebrating all that is happy in life by doing what we love.
          Jam invites us to live in the present moment. We aim to transform the best seasonal fruits into sweet-tart-oh-so-tasty jam through the power of high heat and bass.
          AT Jammin&apos; Jams, we firmly believe that fun and passion can be tasted. This is why we will always play a live DJ set while making jam in our home kitchen.
          We keep our hearts pumping and our jam jammin&apos; with funky techno beats, and we hope you’ll do the same!
        </Paragraph>
        <Paragraph>
          We&apos;re just getting started with this thrilling adventure and would love for you to join us on this crazy ride.
          Please fill out the brief survey below and sign up for our waiting list so you can be notified as soon as we open up our subscription service.
          Space will be limited so sign up now <Emoji label="please">🙏🏽</Emoji>
        </Paragraph>
      </Section>
      <Section>
        inputs and stuff
      </Section>
    </ContentWrapper>
  );
};

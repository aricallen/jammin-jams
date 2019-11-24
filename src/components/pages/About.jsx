import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
  height: 100vh;
`;

const Header = styled('h1')``;

const Body = styled('div')``;

const Paragraph = styled('p')``;

export const About = () => {
  return (
    <Wrapper>
      <Header>-- We put the Jammin’ in JAM! --</Header>
      <Body>
        (PICTURE OF US AT THE FARMERS MARKET)

        <Paragraph>
          We created Jammin’ Jams with the intent of celebrating all that is happy in life by doing what we love.

          Jam invites us to live in the present moment. We aim to transform the best seasonal fruits into sweet-tart-oh-so-tasty jam through the power of high heat and bass.

          AT Jammin Jams, we firmly believe that fun and passion can be tasted. This is why we will always play a live DJ set while making jam in our home kitchen. We keep our hearts pumping and our jam jammin’ with funky techno beats, and we hope you’ll do the same!
        </Paragraph>

        <Paragraph>
          PICTURE OF HAPPY PEOPLE EATING JAM
          —Subscribe—(LINK) to our monthly delivery service. Enjoy this jam with a loved one (or many!) over your favorite music. Scan the QR code on each label to pair with the music we jammed while jammin. And then tell us, what fun are you looking forward to this season?
        </Paragraph>
      </Body>
    </Wrapper>
  );
};
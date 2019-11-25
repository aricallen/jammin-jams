import React from 'react';
import { Content, Header1, Header2, Section, Paragraph } from '../common/Structure';

export const ThankYou = () => {
  return (
    <Content>
      <Header1>Thank you!</Header1>
      <Section>
        <Paragraph>
          Please enjoy our latest techno set recorded live during the making of some amazing cranberry + orange marmalade.
        </Paragraph>
      </Section>
      <Section>
        <Header2>
          Solstice -- Introspection -- 2019-11-24
        </Header2>
        <iframe title="instrospection" width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/718059775&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
      </Section>
    </Content>
  );
};
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { spacing, border, animation, pallet } from '../../../constants/style-guide';
import { WhatItIs } from './WhatItIs';
import { ContentList as HowItWorks } from '../about/HowItWorks';
import { LatestList as JamJourneys } from '../blog/LatestList';
import { LogoFilled } from '../../common/LogoFilled';
import { fontSizes } from '../../../utils/style-helpers';
import { Header1 } from '../../common/Structure';

const SECTIONS = [
  {
    title: 'What it is',
    color: pallet.plum,
    Content: WhatItIs,
  },
  {
    title: 'How it works',
    color: pallet.blueberry,
    Content: HowItWorks,
  },
  {
    title: '#jamjourneys',
    color: pallet.peach,
    Content: JamJourneys,
  },
];

const createColorMap = (color) => ({
  leftEnd: color,
  leftBar: color,
  headband: color,
  rightBar: color,
  rightEnd: color,
  peach: color,
});

const Wrapper = styled('div')``;

const ButtonSection = styled('div')`
  display: flex;
  justify-content: space-around;
  padding: ${spacing.double}px 0;
`;

const SelectorWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: ${spacing.double}px;
  position: relative;
  width: 20%;
  top: 0;
  left: 0;

  .show-on-hover {
    opacity: 0;
  }

  &:hover {
    .show-on-hover {
      opacity: 1;
    }
    .hide-on-hover {
      opacity: 0;
    }
  }
`;

const TitleWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled('span')`
  ${fontSizes('large')}
  color: black;
`;

const LogoWrapper = styled('div')`
  transition: opacity ${animation};
`;

const Selector = ({ section, onClick }) => {
  const { title, color } = section;
  const colorMap = createColorMap(color);
  return (
    <SelectorWrapper onClick={onClick}>
      <TitleWrapper className="show-on-hover">
        <Title>{title}</Title>
      </TitleWrapper>
      <LogoWrapper className="hide-on-hover">
        <LogoFilled colorMap={colorMap} />
      </LogoWrapper>
    </SelectorWrapper>
  );
};

const AboutWrapper = styled('div')`
  padding: ${spacing.double}px;
  border: ${border};
  margin-bottom: ${spacing.double}px;
`;

const About = ({ section }) => {
  const { title, Content } = section;
  return (
    <AboutWrapper>
      <Header1>{title}</Header1>
      <Content />
    </AboutWrapper>
  );
};

export const AboutSwitcher = () => {
  const [selected, setSelected] = useState(SECTIONS[0]);

  return (
    <Wrapper>
      <ButtonSection>
        {SECTIONS.map((section) => (
          <Selector key={section.title} onClick={() => setSelected(section)} section={section} />
        ))}
      </ButtonSection>
      <About section={selected} />
    </Wrapper>
  );
};

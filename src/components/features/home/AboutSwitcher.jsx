/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { spacing, border, pallet } from '../../../constants/style-guide';
import { WhatItIs } from './WhatItIs';
import { HowItWorks } from './HowItWorks';
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

const SelectorSection = styled('div')`
  display: flex;
  justify-content: space-around;
  padding: ${spacing.double}px 0;
`;

const SelectorWrapper = styled('div')`
  cursor: pointer;
  padding: ${spacing.quadruple}px;
  outline: ${(p) => (p.isSelected ? border : 'none')};
  &:hover {
    background-color: ${pallet.light.strawberry};
  }
`;

const TitleWrapper = styled('div')`
  text-align: center;
  padding-top: ${spacing.regular}px;
`;

const Title = styled('span')`
  ${fontSizes('large')}
  color: black;
`;

const LogoWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Selector = ({ section, onClick, isSelected }) => {
  const { title, color } = section;
  const colorMap = isSelected ? createColorMap(color) : {};
  return (
    <SelectorWrapper onClick={onClick} isSelected={isSelected}>
      <LogoWrapper className="hide-on-hover">
        <LogoFilled colorMap={colorMap} />
      </LogoWrapper>
      <TitleWrapper className="show-on-hover">
        <Title>{title}</Title>
      </TitleWrapper>
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
      <SelectorSection>
        {SECTIONS.map((section) => (
          <Selector
            key={section.title}
            onClick={() => setSelected(section)}
            section={section}
            isSelected={section === selected}
          />
        ))}
      </SelectorSection>
      <About section={selected} />
    </Wrapper>
  );
};

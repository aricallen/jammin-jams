/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { spacing, border, pallet, font } from '../../../constants/style-guide';
import { WhatItIs } from './WhatItIs';
import { HowItWorks } from './HowItWorks';
import { LatestList as JamJourneys } from '../blog/LatestList';
import { LogoFilled } from '../../common/LogoFilled';
import { fontSizes, boxShadow } from '../../../utils/style-helpers';
import { Header1, MobileOnly, DesktopOnly } from '../../common/Structure';

const SECTIONS = [
  {
    title: 'What it is',
    color: pallet.light.apricot,
    Content: WhatItIs,
  },
  {
    title: 'How it works',
    color: pallet.light.apricot,
    Content: HowItWorks,
  },
  {
    title: '#jamjourneys',
    color: pallet.light.apricot,
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
  outline: ${(p) => (p.isSelected ? `1px solid ${pallet.sky}` : 'none')};
  box-shadow: ${(p) => (p.isSelected ? boxShadow(pallet.strawberry) : 'none')};
  &:hover {
    background-color: ${pallet.sky};
  }
`;

const TitleWrapper = styled('div')`
  text-align: center;
  padding-top: ${spacing.regular}px;
`;

const Title = styled('span')`
  ${fontSizes('large')}
  color: black;
  font-weight: ${font.weight.regular};
  text-decoration: underline;
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

const HeaderWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.double}px;
`;

const About = ({ section }) => {
  const { title, Content, color } = section;
  return (
    <AboutWrapper>
      <HeaderWrapper>
        <Header1 style={{ marginBottom: 0 }}>{title}</Header1>
        <MobileOnly>
          <LogoWrapper style={{ width: 80 }}>
            <LogoFilled colorMap={createColorMap(color)} />
          </LogoWrapper>
        </MobileOnly>
      </HeaderWrapper>
      <Content />
    </AboutWrapper>
  );
};

export const AboutSwitcher = () => {
  const [selected, setSelected] = useState(SECTIONS[0]);

  return (
    <Wrapper>
      <MobileOnly>
        <About section={SECTIONS[0]} />
        <About section={SECTIONS[1]} />
        <About section={SECTIONS[2]} />
      </MobileOnly>
      <DesktopOnly>
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
      </DesktopOnly>
    </Wrapper>
  );
};

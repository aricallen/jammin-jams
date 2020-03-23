import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { expandSection, collapseSection } from '../../utils/expandable-helpers';
import { fontSizes } from '../../utils/style-helpers';
import { pallet, border, spacing, animation } from '../../constants/style-guide';
import ChevronIcon from '../../assets/icons/chevron_right.svg';
import { Row } from './Tables';

const Wrapper = styled('div')``;

const HeaderText = styled('div')``;
const Chevron = styled('div')`
  display: flex;
  align-items: center;
  transition: transform ${animation};
  &.is-expanded {
    transform: rotate(${360 + 90}deg);
  }
  svg {
    fill: ${pallet.charcoal};
  }
`;

const HeaderRow = styled(Row)`
  ${fontSizes('large')}
  border-bottom: ${border};
  padding-bottom: ${spacing.regular}px;
  padding-left: 0;
  margin-bottom: ${spacing.regular}px;
  display: flex;
  justify-content: space-between;
`;

const BodySection = styled('div')`
  transition: height ${animation};
  overflow: ${(p) => (p.isExpanded ? 'auto' : 'hidden')};
  height: ${(p) => (p.isExpanded ? p.height : '0px')};
`;

export const ExpandableSection = (props) => {
  const { headerText, Content, defaultIsExpanded = false } = props;
  const [isExpanded, setIsExpanded] = useState(defaultIsExpanded);
  const bodyRef = useRef();

  const onToggleExpand = () => {
    if (isExpanded) {
      // collapse
      collapseSection(bodyRef.current);
    } else {
      expandSection(bodyRef.current);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <Wrapper>
      <HeaderRow onClick={onToggleExpand}>
        <HeaderText>{headerText}</HeaderText>
        <Chevron className={isExpanded ? 'is-expanded' : 'is-collapsed'}>
          <ChevronIcon />
        </Chevron>
      </HeaderRow>
      <BodySection ref={bodyRef} isExpanded={isExpanded} height={bodyRef.current?.scrollHeight}>
        <Content />
      </BodySection>
    </Wrapper>
  );
};

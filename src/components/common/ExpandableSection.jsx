import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { expandSection, collapseSection } from '../../utils/expandable-helpers';
import { fontSizes } from '../../utils/style-helpers';
import { border, spacing, animation } from '../../constants/style-guide';
import { Row } from './Tables';

const Wrapper = styled('div')``;

const HeaderRow = styled(Row)`
  ${fontSizes('large')}
  border-bottom: ${border};
  padding-bottom: ${spacing.regular}px;
  padding-left: 0;
  margin-bottom: ${spacing.regular}px;
`;

const BodySection = styled('div')`
  overflow: ${(p) => (p.isExpanded ? 'auto' : 'hidden')};
  transition: height ${animation};
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
      <HeaderRow onClick={onToggleExpand}>{headerText}</HeaderRow>
      <BodySection ref={bodyRef} isExpanded={isExpanded} height={bodyRef.current?.scrollHeight}>
        <Content />
      </BodySection>
    </Wrapper>
  );
};

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
  overflow: hidden;
  transition: height ${animation};
  height: 0px;
`;

export const ExpandableSection = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { headerText, Content } = props;
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
      <BodySection ref={bodyRef} isExpanded={isExpanded}>
        <Content />
      </BodySection>
    </Wrapper>
  );
};

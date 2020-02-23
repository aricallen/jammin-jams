import React from 'react';
import styled from '@emotion/styled';
import { spacing } from '../../constants/style-guide';
import { fontSizes } from '../../utils/style-helpers';
import { media } from '../../utils/media';
import { NewsletterBlock } from './NewletterBlock';
import { FollowUs } from './FollowUs';

const LEFT_COL_WIDTH = `${spacing.quadruple}px`;
const MIDDLE_COL_WIDTH = `${spacing.triple * 30}px`;
const RIGHT_COL_WIDTH = `${spacing.quadruple * 10}px`;

export const Wrapper = styled('article')`
  display: flex;
  justify-content: center;
  ${fontSizes('regular')}
`;

export const GridWrapper = styled('div')``;

export const Grid = styled('div')`
  display: grid;
  padding-top: ${spacing.quadruple}px;
  grid-gap: ${spacing.quadruple * 2}px;
  grid-template-columns: ${LEFT_COL_WIDTH} ${MIDDLE_COL_WIDTH} ${RIGHT_COL_WIDTH};
  height: min-content;
  grid-template-areas: 'left middle right';
  ${media.mobile()} {
    grid-template-columns: auto;
  }
`;

export const ColLeft = styled('div')`
  grid-area: left;
  ${media.mobile()} {
    display: none;
  }
`;

export const ColMain = styled('div')`
  grid-area: middle;
`;

export const ColRight = styled('div')`
  grid-area: right;
  ${media.mobile()} {
    display: none;
  }
`;

export const MobileWrapper = styled('div')`
  & > div {
    margin-top: ${spacing.double}px;
  }

  ${media.desktop()} {
    display: none;
  }
`;

export const Article = (props) => {
  const { Left = FollowUs, Middle, Right = NewsletterBlock } = props;
  return (
    <Wrapper>
      <GridWrapper>
        <Grid>
          <ColLeft>
            <Left />
          </ColLeft>
          <ColMain>
            <Middle />
            <MobileWrapper>
              <Left />
              <Right />
            </MobileWrapper>
          </ColMain>
          <ColRight>
            <Right />
          </ColRight>
        </Grid>
      </GridWrapper>
    </Wrapper>
  );
};

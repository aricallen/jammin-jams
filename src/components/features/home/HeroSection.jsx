import React from 'react';
import styled from '@emotion/styled';
import { pallet } from '../../../constants/style-guide';

const HeroImage = styled('div')`
  height: 80vh;
  min-height: 600px;
  background-color: ${pallet.charcoal};
`;

export const HeroSection = () => <HeroImage />;

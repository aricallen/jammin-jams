import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

/**
 * overrides global 'a' styled
 */
export const UnstyledLink = styled(Link)`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

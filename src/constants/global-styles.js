import { css } from '@emotion/core';
import { pallet, animation } from './style-guide';

export const globalStyles = css`
  html,
  body {
    width: 100%;
    min-height: 100vh;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 300;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul,
  a,
  li {
    line-height: 1.5em;
  }

  .nunito-sans {
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 300;
  }

  .staatliches {
    font-family: 'staatliches', open-sans;
  }

  a {
    color: ${pallet.strawberry};
    text-decoration: none;
    transition: color ${animation};
    &:hover {
      color: ${pallet.light.strawberry};
    }
  }
`;

import React from 'react';
import { omit } from 'lodash';

export const Spinner = (props = {}) => {
  const fill = props.fill || '#FFFFFF';
  const backgroundColor = props.backgroundColor || 'transparent';
  const otherProps = omit(props, ['fill', 'background']);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: 'auto',
        background: backgroundColor,
        display: 'block',
        shapeRendering: 'auto',
      }}
      width="1em"
      height="1em"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...otherProps}
    >
      <defs>
        <filter
          id="ldio-089murzl39sr-filter"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          <feComponentTransfer result="cutoff">
            <feFuncA type="linear" slope="60" intercept="-40" />
          </feComponentTransfer>
        </filter>
      </defs>
      <g filter="url(#ldio-089murzl39sr-filter)" transform="rotate(90.7158 50 50)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="4.166666666666667s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
        <g transform="rotate(260.688 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="0" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.7666666666666666 0 0.6666666666666666 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(278.538 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="1" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.7333333333333333 0 0.6333333333333333 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(293.018 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="2" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.7 0 0.6 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(304.443 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="3" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.6666666666666666 0 0.5666666666666667 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(313.395 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="4" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.6333333333333333 0 0.5333333333333333 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(320.442 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="5" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.6 0 0.5 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(326.046 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="6" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.5666666666666667 0 0.4666666666666667 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(330.555 50.0001 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="7" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.5333333333333333 0 0.43333333333333335 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(334.23 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="8" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.5 0 0.4 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(337.259 50.0001 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="9" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.4666666666666667 0 0.36666666666666664 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(339.784 50.0001 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="10" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.43333333333333335 0 0.3333333333333333 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(341.91 50.0001 50.0001)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="11" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.4 0 0.3 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(343.716 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="12" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.3666666666666667 0 0.26666666666666666 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(345.263 49.9999 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="13" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.33333333333333337 0 0.23333333333333334 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(346.599 50.0001 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="14" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.30000000000000004 0 0.2 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(347.76 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="15" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.26666666666666666 0 0.16666666666666666 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(348.776 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="16" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.23333333333333334 0 0.13333333333333333 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(349.67 50.0002 50.0001)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="17" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.2 0 0.1 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(350.46 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="18" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.16666666666666669 0 0.06666666666666667 1"
            repeatCount="indefinite"
          />
        </g>
        <g transform="rotate(351.163 50 50)">
          <g transform="translate(50 20)">
            <circle cx="0" cy="0" r="19" fill={fill} transform="scale(0.5)" />
          </g>
          <animateTransform
            attributeName="transform"
            calcMode="spline"
            type="rotate"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.3888888888888888"
            keySplines="0.13333333333333333 0 0.03333333333333333 1"
            repeatCount="indefinite"
          />
        </g>
      </g>
    </svg>
  );
};

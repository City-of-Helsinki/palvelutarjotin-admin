import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g stroke="#444444" strokeWidth="2">
        <g transform="translate(1.000000, 1.000000)">
          <line x1="19" y1="16" x2="19" y2="22" strokeLinecap="square"></line>
          <line x1="16" y1="19" x2="22" y2="19" strokeLinecap="square"></line>
          <polyline
            strokeLinecap="square"
            points="11 21 0 21 0 3 22 3 22 11"
          ></polyline>
          <line x1="6" y1="0" x2="6" y2="3" strokeLinecap="square"></line>
          <line x1="16" y1="0" x2="16" y2="3" strokeLinecap="square"></line>
          <line x1="0" y1="7" x2="22" y2="7"></line>
        </g>
      </g>
    </g>
  </svg>
);

import React, {SVGProps} from 'react';

export function CloseCollapseIcon({ ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <g clipPath='url(#clip0_554_163982)'>
        <path
          d='M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z'
          stroke='#21272A'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M8 12H16' stroke='#21272A' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </g>
      <defs>
        <clipPath id='clip0_554_163982'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

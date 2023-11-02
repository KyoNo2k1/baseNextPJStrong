import React, {SVGProps} from 'react';

export default function FundsTransferIcon({ ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' width={20} height={20}  fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <path
        d='M17 4L14 7M17 20V4V20ZM17 4L20 7L17 4Z'
        stroke='#21272A'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7 20L4 17M7 4V20V4ZM7 20L10 17L7 20Z'
        stroke='#21272A'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

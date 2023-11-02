import React, {SVGProps} from 'react';

export default function ExportIcon({ ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <path d='M6 20H18H6Z' fill='#001D6C' />
      <path d='M6 20H18' stroke='#21272A' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M12 16L8.5 12.5M12 4V16V4ZM12 16L15.5 12.5L12 16Z'
        stroke='#21272A'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

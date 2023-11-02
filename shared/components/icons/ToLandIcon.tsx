import React, {SVGProps} from 'react';

export default function ToLandIcon({ ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <g clip-path='url(#clip0_672_189850)'>
        <path
          d='M12.6302 9.84176L16.6549 10.9202C17.0819 11.0346 17.4459 11.3139 17.6669 11.6967C17.8879 12.0795 17.9478 12.5344 17.8334 12.9614C17.719 13.3884 17.4397 13.7524 17.0569 13.9734C16.6741 14.1944 16.2191 14.2543 15.7922 14.1399L3.71809 10.9047L2.59737 5.42801L5.01218 6.07506L6.19069 8.1163L8.60551 8.76335L8.50541 2.69742L10.9202 3.34446L12.6302 9.84176Z'
          stroke='#21272A'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M2.5 17.5H17.5' stroke='#21272A' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </g>
      <defs>
        <clipPath id='clip0_672_189850'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

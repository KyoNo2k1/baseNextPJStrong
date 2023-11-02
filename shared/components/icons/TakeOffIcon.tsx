import React, {SVGProps} from 'react';

export default function TakeOffIcon({ ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <g clip-path='url(#clip0_672_189827)'>
        <path
          d='M12.2005 8.54847L16.2252 7.47006C16.6522 7.35565 17.1071 7.41554 17.4899 7.63656C17.8727 7.85757 18.1521 8.2216 18.2665 8.64857C18.3809 9.07553 18.321 9.53046 18.1 9.91326C17.879 10.2961 17.5149 10.5754 17.088 10.6898L5.01388 13.925L1.30498 9.74246L3.71979 9.09542L5.76103 10.2739L8.17585 9.62688L5.05619 4.42368L7.47101 3.77663L12.2005 8.54847Z'
          stroke='#21272A'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M2.5 17.5H17.5' stroke='#21272A' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </g>
      <defs>
        <clipPath id='clip0_672_189827'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

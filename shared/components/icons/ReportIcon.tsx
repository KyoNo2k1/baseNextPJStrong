import React, {SVGProps} from 'react';

export default function ReportIcon({ ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <path d='M10 9H6' stroke='#21272A' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M15.5 11C14.1193 11 13 9.88071 13 8.5C13 7.11929 14.1193 6 15.5 6C16.8807 6 18 7.11929 18 8.5C18 9.88071 16.8807 11 15.5 11Z'
        stroke='#21272A'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M6 6H9' stroke='#21272A' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M18 18L13.5 15L11 17L6 13'
        stroke='#21272A'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z'
        stroke='#21272A'
        strokeWidth='1.5'
      />
    </svg>
  );
}

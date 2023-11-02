import React, {SVGProps} from 'react';

export default function SuccessIcon({ ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <rect width="64" height="64" rx="32" fill="#DCFCD9"/>
      <g clip-path="url(#clip0_1673_41610)">
        <path d="M32 16C23.1638 16 16 23.1613 16 32C16 40.8388 23.1638 48 32 48C40.8363 48 48 40.8344 48 32C48 23.1656 40.8363 16 32 16Z" fill="#2AD352"/>
        <path d="M16 32C15.9964 34.6447 16.6513 37.2486 17.9056 39.5769C19.5037 40.0461 21.1608 40.2837 22.8263 40.2825C32.445 40.2825 40.2425 32.485 40.2425 22.8663C40.244 21.1744 39.9989 19.4913 39.515 17.87C37.202 16.638 34.6207 15.9957 32 16C23.1638 16 16 23.1613 16 32Z" fill="#74DA7F"/>
        <path d="M41.1257 29.3487L31.5088 39.4481C31.2467 39.7231 30.9319 39.9423 30.583 40.0926C30.2342 40.243 29.8587 40.3214 29.4788 40.3231H29.4663C29.0886 40.3232 28.7147 40.2474 28.3668 40.1002C28.019 39.953 27.7042 39.7374 27.4413 39.4662L22.3382 34.21C22.0745 33.9453 21.866 33.6309 21.7248 33.285C21.5837 32.9391 21.5126 32.5686 21.5157 32.1951C21.5189 31.8215 21.5962 31.4522 21.7432 31.1088C21.8902 30.7653 22.1039 30.4545 22.372 30.1943C22.6401 29.9341 22.9572 29.7297 23.3049 29.5931C23.6526 29.4564 24.024 29.3902 24.3975 29.3982C24.771 29.4063 25.1392 29.4884 25.4807 29.6399C25.8223 29.7913 26.1303 30.0091 26.3869 30.2806L29.4463 33.4319L37.0395 25.4581C37.2938 25.1854 37.5997 24.9658 37.9395 24.812C38.2793 24.6582 38.6462 24.5733 39.019 24.5623C39.3917 24.5512 39.763 24.6142 40.1113 24.7475C40.4596 24.8808 40.778 25.0819 41.0481 25.3391C41.3182 25.5962 41.5347 25.9044 41.6849 26.2457C41.8351 26.5871 41.9162 26.9548 41.9234 27.3277C41.9306 27.7006 41.8639 28.0712 41.7269 28.4181C41.59 28.765 41.3857 29.0813 41.1257 29.3487Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_1673_41610">
          <rect width="32" height="32" fill="white" transform="translate(16 16)"/>
        </clipPath>
      </defs>
    </svg>


  );
}
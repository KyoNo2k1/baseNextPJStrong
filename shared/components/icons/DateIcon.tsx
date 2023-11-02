import React, {SVGProps} from 'react';

export function DateIcon({...rest}: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M13 2C14.0938 2 15 2.90625 15 4V14C15 15.125 14.0938 16 13 16H3C1.875 16 1 15.125 1 14V4C1 2.90625 1.875 2 3 2H4.25V0.75C4.25 0.34375 4.5625 0 5 0C5.40625 0 5.75 0.34375 5.75 0.75V2H10.25V0.75C10.25 0.34375 10.625 0 11 0C11.4062 0 11.75 0.34375 11.75 0.75V2H13ZM13 14.5C13.25 14.5 13.5 14.2812 13.5 14V6H2.5V14C2.5 14.2812 2.71875 14.5 3 14.5H13Z"
        fill="#997F59"/>
    </svg>

  );
}

import React from 'react';
import { SpinnerContainer, TortoiseSVG } from '../components/SharedList/ListElements'; // Correct import path

const TortoiseSpinner = () => {
  return (
    <SpinnerContainer>
      <TortoiseSVG>
        <g className="tortoise">
          <path d="M 100 20 C 130 25, 160 40, 160 70 C 160 100, 130 110, 100 110 C 70 110, 40 100, 40 70 C 40 40, 70 25, 100 20 Z" />
          <g className="head">
            <ellipse cx="175" cy="60" rx="15" ry="10" />
          </g>
          <g className="leg" transform="translate(60, 90)">
            <rect x="-5" y="0" width="10" height="30" />
          </g>
          <g className="leg" transform="translate(140, 90)">
            <rect x="-5" y="0" width="10" height="30" />
          </g>
          <polygon points="20 70, 10 75, 20 80" />
        </g>
      </TortoiseSVG>
    </SpinnerContainer>
  );
};

export default TortoiseSpinner;
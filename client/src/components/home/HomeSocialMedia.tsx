import React from 'react';

import facebook from '../../styles/images/facebook.svg';
import twitter from '../../styles/images/twitter.svg';
import instagram from '../../styles/images/instagram.svg';

const HomeSocialMedia = () => {
  return (
    <div className="absolute-social">
      <ul>
        <li>
          <img src={facebook} alt="facebook icon" />
        </li>
        <li>
          <img src={instagram} alt="instagram icon" />
        </li>
        <li>
          <img src={twitter} alt="twitter icon" />
        </li>
      </ul>
    </div>
  );
};

export default HomeSocialMedia;

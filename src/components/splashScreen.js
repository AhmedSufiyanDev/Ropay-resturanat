// SplashScreen.js
import React from 'react';
import { LoaderSplash, splashPattern, RiaPay } from '../assets/images/images';
import '../container/frontend/scss/splash.scss';

const SplashScreen = () => {
  console.log(splashPattern); // Ensure splashPattern is a valid URL or path

  return (
    <div className='center-item'>
      <div className='splash-bg'>
        <div className='splash-anim' style={{ backgroundImage: `url(${splashPattern})` }}>
          <div className='logo'>
            <img src={RiaPay} />
          </div>
          <div className='loader'>
          </div>
        </div>
      </div>
    </div>
  );
};



export default SplashScreen;

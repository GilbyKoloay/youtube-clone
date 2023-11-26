import { useState } from 'react';

import { Header, NavMaximized } from '../../components';
import VideoComponent from './Video';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';



const Video = () => {
  const [isNavbarShown, setIsNavbarShown] = useState(false);



  return (
    <div className='h-screen flex flex-col'>
      <Header burgerOnClick={() => setIsNavbarShown(!isNavbarShown)} />
      <div className='flex overflow-auto'>
        {isNavbarShown && <NavMaximized />}

        <div className={`flex-1 pt-6 px-8 ${isNavbarShown ? 'overflow-hidden' : 'overflow-auto'}`}>
          <div className='flex gap-6'>
            <div className='flex-[2] flex flex-col gap-3'>
              <VideoComponent />
              <VideoDetail />
            </div>
            <VideoList />
          </div>
        </div>
      </div>
    </div>
  );
};



export default Video;

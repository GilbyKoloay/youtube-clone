import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Header, NavMaximized } from '../../components';
import Control from './Control';
import Description from './Description';
import Comments from './Comments';
import VideoList from './VideoList';



const Video = () => {
  const navigate = useNavigate();

  const [isNavbarShown, setIsNavbarShown] = useState(false);
  const [video, setVideo] = useState(null);

  const { id } = useParams();

  

  useEffect(() => {
    checkVideoExistence();
  }, []);



  async function checkVideoExistence() {
    if (false) navigate('/not-found');
    else {
      // load video
    }
  }



  return (
    <div className='h-screen flex flex-col'>
      <Header burgerOnClick={() => setIsNavbarShown(!isNavbarShown)} />
      <div className='flex overflow-auto'>
        {isNavbarShown && <NavMaximized />}

        <div className={`flex-1 pt-6 px-8 ${isNavbarShown ? 'overflow-hidden' : 'overflow-auto'}`}>
          <div className='flex gap-6'>
            <div className='flex-[2] flex flex-col gap-3'>
              <div className='bg-neutral-500 h-128 aspect-video rounded-xl' />
              <div className='flex flex-col gap-3'>
                {video
                  ? <div className='text-lg font-bold'>video.title</div>
                  : <div className='w-1/2 p-3 bg-neutral-800 rounded-sm' />
                }
                <Control video={video} />
                <Description video={video} />
                {video && <Comments />}
              </div>
            </div>
            <VideoList />
          </div>
        </div>
      </div>
    </div>
  );
};



export default Video;

import { useState, useEffect } from 'react';

import { Dots } from '../../assets/svg';



const VideoList = () => {
  const [videoList, setVideoList] = useState(null);



  useEffect(() => {
    loadVideo();
  }, []);



  async function loadVideo() {
    
  }

  function toProperVideoTotalView(value) {
    return value;
    
    // const trimmedValue = value.replaceAll(/\D/g, '');

    // if (trimmedValue.length > 9) return `${trimmedValue.slice(0, 3)}.${trimmedValue[3]}B`;
    // if (trimmedValue.length > 6) return `${trimmedValue.slice(0, 3)}.${trimmedValue[3]}M`;
    // if (trimmedValue.length > 3) return `${trimmedValue.slice(0, 3)}K`;
    // return trimmedValue;
  }

  function toProperVideoUploadDate(value) {
    return value;
  }



  if (!videoList) {
    return (
      <div className='pr-8 flex-1 mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-3 gap-x-4 overflow-auto'>
        {[...new Array(9)].map((_, index) => (
          <div key={index} className='mt-6 grid grid-rows-3'>
            <div className='row-span-2 relative'>
              <div className='h-full w-full aspect-video rounded-xl bg-neutral-800' />
            </div>

            <div className='mt-2 flex'>
              <div className='h-10 w-10 rounded-full bg-neutral-800' />

              <div className='ml-3 flex-1 flex flex-col text-left gap-2'>
                <div className='bg-neutral-800 p-3 rounded-sm w-11/12'></div>
                <div className='bg-neutral-800 p-3 rounded-sm w-7/12'> </div>
              </div>
            </div>
          </div>
        ))}

        <div className='col-span-full h-8 flex'>
          <div className='my-auto mx-auto h-full aspect-square border-y-2 border-s-2 border-neutral-500 rounded-full animate-spin' />
        </div>
      </div>
    );
  }

  return (
    <div className='pr-8 flex-1 mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-3 gap-x-4 overflow-auto'>
      {videoList.map((video, index) => (
        <button key={index} className='mt-6 grid grid-rows-3'>
          <div className='row-span-2 relative'>
            <img
              className='h-full w-full aspect-video rounded-xl'
              src={video.thumbnailUrl}
              alt='video-thumbnail'
            />
            <span className='absolute bottom-1 right-1 bg-black bg-opacity-80 p-1 font-bold text-right text-xs rounded'>{video.duration}</span>
          </div>

          <div className='mt-2 flex'>
            <img
              className='h-10 w-10 rounded-full'
              src={video.thumbnailUrl}
              alt='video-author'
            />

            <div className='ml-3 flex-1 flex flex-col text-left'>
              <span className='font-bold line-clamp-2 text-ellipsis' title={video.title}>{video.title}.</span>
              <span className='text-sm text-neutral-400 hover:text-neutral-200' title={video.author}>{video.author}</span>
              <span className='text-sm text-neutral-400'>{toProperVideoTotalView(video.views)} • {toProperVideoUploadDate(video.uploadTime)}</span>
            </div>
            
            <div>
              <img
                className='mx-auto'
                src={Dots}
                alt='options'
              />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};



export default VideoList;

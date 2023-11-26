import { useState } from 'react';

import { Videos, ProfileRectangle } from '../../assets/svg';



const Description = ({ video }) => {
  const [isExpanded, setIsExpanded] = useState(false);



  if (!video) {
    return (
      <div className='mt-2 border-t pt-4 border-neutral-800 flex justify-between items-center'>
        {/* <----- left */}
        <div className='w-2/5 flex items-center gap-4'>
          <div className='p-7 bg-neutral-800 rounded-full' />
          <div className='w-full flex flex-col gap-4'>
            <div className='w-full p-3 bg-neutral-800 rounded-lg' />
            <div className='w-full p-3 bg-neutral-800 rounded-lg' />
          </div>
        </div>
        {/* left -----> */}

        {/* <----- right */}
        <div className='p-5 rounded-lg bg-neutral-800 w-1/5' />
        {/* right -----> */}
      </div>
    );
  }

  return (
    <div className={`py-2 px-3 bg-neutral-800 rounded-xl ${!isExpanded ? 'hover:bg-neutral-700 cursor-pointer' : ''}`} onClick={!isExpanded ? () => setIsExpanded(true) : null}>
      {/* <----- description header */}
      <div className='flex gap-2'>
        <span className='font-bold text-sm'>{video.views} views</span>
        <span className='font-bold text-sm'>{video.uploadDateTime}</span>
        {video.tags.map((tag, index) => <span key={index} className='font-bold text-sm text-neutral-400'>{tag}</span>)}
      </div>
      {/* description header -----> */}

      {/* <----- description */}
      <p className={`text-sm ${!isExpanded ? 'line-clamp-3' : ''}`}>{video.description}</p>
      {!isExpanded && <span className='font-bold text-sm'> ...more</span>}
      {/* description -----> */}

      {/* <----- description footer */}
      {isExpanded && (
        <>
          <div className='mt-8 flex items-center gap-2'>
            <div className='h-16 w-16 rounded-full bg-neutral-500' />
            <div className='flex flex-col'>
              <span className='font-bold text-lg'>{video.channelName}</span>
              <span className='text-sm'>{video.subscribers} subscribers</span>
            </div>
          </div>

          <div className='mt-4 w-5/6 flex gap-3'>
            <DescriptionButton imgSrc={Videos} imgAlt='videos'>Videos</DescriptionButton>
            <DescriptionButton src={ProfileRectangle} alt='About'>About</DescriptionButton>
          </div>

          <button className='mt-12 font-bold text-sm' onClick={() => setIsExpanded(false)}>Show less</button>
        </>
      )}
      {/* description footer -----> */}
    </div>
  );
};



const DescriptionButton = ({ children, imgSrc, imgAlt }) => {
  return (
    <button className='w-full py-1 flex justify-center items-center gap-2 border hover:bg-neutral-600 border-neutral-600 rounded-full text-sm font-bold'>
      <img
        className='h-6'
        src={imgSrc}
        alt={imgAlt}
      />
      {children}
    </button>
  )
};



export default Description;

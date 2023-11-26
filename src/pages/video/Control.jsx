import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Like,
  Dislike,
  Share,
  Download,
  Dots
} from '../../assets/svg';



const Control = ({ video }) => {
  const subscribeDialogRef = useRef();



  return (
    <div className='flex justify-between items-center'>
      {/* <----- left */}
      {!video
        ? (
          <div className='w-1/4 p-3 bg-neutral-800 rounded-sm' />
        )
        : (
          <div className='flex items-center'>
            <div className='h-10 w-10 bg-neutral-500 rounded-full' />
            <div className='ml-3 mr-6'>
              <div className='font-bold'>{video.channelName}</div>
              <div className='text-xs text-neutral-500'>{video.subscribers} subscribers</div>
            </div>
            <SubscribeDialog thisRef={subscribeDialogRef} />
            <ControlButton onClick={() => subscribeDialogRef.current.showModal()} theme='light' isLong>Subscribe</ControlButton>
          </div>
        )
      }
      
      {/* left -----> */}

      {/* <----- right */}
      {!video
        ? (
          <div className='flex items-center gap-6'>
            {[...new Array(5)].map((_, index) => <div key={index} className='bg-neutral-800 rounded-full p-3' />)}
          </div>
        )
        : (
          <div className='flex gap-2'>
            <div className='flex items-center'>
              <button className='py-2 px-4 border-r border-neutral-500 rounded-l-full font-bold text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center gap-1' title='I like this'>
                <img src={Like} alt='like' />
                {video.likes}
              </button>
              <button className='py-2 px-4 border-l border-neutral-500 rounded-r-full font-bold text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center gap-1' title='I dislike this'>
                <img src={Dislike} alt='dislike' />
                {video.dislikes}
              </button>
            </div>

            <ControlButton title='Share' isLong>
              <img src={Share} alt='share' />
              Share
            </ControlButton>
            <ControlButton title='Download' isLong>
              <img src={Download} alt='download' />
              Download
            </ControlButton>
            <ControlButton>
              <img
                className='rotate-90'
                src={Dots}
                alt='options'
              />
            </ControlButton>
          </div>
        )
      }
      {/* right -----> */}
    </div>
  );
};



const SubscribeDialog = ({ thisRef }) => {
  const navigate = useNavigate();



  return (
    <dialog className='bg-neutral-800 py-4 pl-6 pr-28' ref={thisRef}>
      <div className='text-lg text-neutral-300'>Want to subscribe to this channel?</div>
      <div className='mt-3 text-sm text-neutral-400'>Sign in to subscribe to this channel.</div>
      <button className='text-sm mt-10 py-2 px-4 rounded-full hover:bg-cyan-900 text-blue-500' onClick={() => navigate('/sign-in')}>Sign in</button>
    </dialog>
  );
};



const ControlButton = ({
  children,
  onClick,
  theme='dark',
  isLong=false,
  title
}) => {
  return (
    <button
      className={`${isLong ? 'py-2 px-4' : 'p-2'} rounded-full font-bold text-sm ${(theme === 'dark') ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'} flex items-center gap-1`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};



export default Control;

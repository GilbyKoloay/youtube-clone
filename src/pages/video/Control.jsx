import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LikeLight,
  LikeDark,
  DislikeLight,
  DislikeDark,
  Share,
  Download,
  Dots
} from '../../assets/svg';
import {
  likeVideo,
  dislikeVideo,
  getVideo
} from '../../firebase';
import { toProperCount } from '../../functions';
import { useAppState } from '../../hooks';



const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;



const ChannelImage = ({ channelId, video, setVideo }) => {
  const [image, setImage] = useState('');



  useEffect(() => {
    getChannelImage();
  }, []);



  async function getChannelImage() {
    const req = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${youtubeApiKey}&id=${channelId}&part=snippet%2Cstatistics`);
    const res = await req.json();
    
    if (res.error) console.log('Unable to load channel.', res.error);
    else if (res.items) {
      setVideo({...video, subscribers: res.items[0]?.statistics?.subscriberCount});
      setImage(res?.items[0]?.snippet?.thumbnails?.high?.url);
    }
  }



  return (
    <img
      className='h-10 w-10 rounded-full bg-neutral-500'
      src={image}
      alt='channel'
    />
  );
};



const Control = ({ video, setVideo }) => {
  const subscribeDialogRef = useRef();
  const likeDialogRef = useRef();
  const dislikedialogRef = useRef();

  const { auth, user } = useAppState();

  const [firebaseVideo, setFirebaseVideo] = useState(null);
  const [isVideoLiked, setIsVideoLiked] = useState(null);
  const [isVideoDisliked, setIsVideoDisliked] = useState(null);

  

  useEffect(() => {
    if (video) getVideo(video.id, setFirebaseVideo);
  }, [video]);

  useEffect(() => {
    if (user && video) checkIsVideoLikedOrDisliked();
    else if (!user) {
      setIsVideoLiked(false);
      setIsVideoDisliked(false);
    }
  }, [user, video]);



  function checkIsVideoLikedOrDisliked() {
    // check is video liked
    if (user.likedVideos.includes(video.id)) setIsVideoLiked(true);
    else setIsVideoLiked(false);

    // check is video disliked
    if (user.dislikedVideos.includes(video.id)) setIsVideoDisliked(true);
    else setIsVideoDisliked(false);
  }

  function removeFloatingPointValue(value) {
    if (toProperCount(value).includes('.')) return `${toProperCount(value).slice(0, -3)}${toProperCount(value).slice(-1)}`;
    return toProperCount(value);
  }

  function handleLikeOnClick() {
    if (isVideoDisliked) {
      dislikeVideo(auth.uid, video.id, false);
      setIsVideoDisliked(false);
    }
    else if (isVideoLiked) {
      likeVideo(auth.uid, video.id, false);
      setIsVideoLiked(false);
    }
    else {
      likeVideo(auth.uid, video.id, true);
      setIsVideoLiked(true);
    }
  }

  function handleDislikeOnClick() {
    if (isVideoLiked) {
      likeVideo(auth.uid, video.id, false);
      setIsVideoLiked(false);
    }
    else if (isVideoDisliked) {
      dislikeVideo(auth.uid, video.id, false);
      setIsVideoDisliked(false);
    }
    else {
      dislikeVideo(auth.uid, video.id, true);
      setIsVideoDisliked(true);
    }
  }



  return (
    <div className='flex justify-between items-center'>
      {/* <----- left */}
      {!video
        ? (
          <div className='w-1/4 p-3 bg-neutral-800 rounded-sm' />
        )
        : (
          <div className='flex items-center'>
            <ChannelImage
              channelId={video.channelId}
              video={video}
              setVideo={setVideo}
            />
            <div className='ml-3 mr-6'>
              <div className='font-bold'>{video.channelName}</div>
              <div className='text-xs text-neutral-500'>{removeFloatingPointValue(video.subscribers)} subscribers</div>
            </div>
            <ControlButton onClick={auth ? null : () => subscribeDialogRef.current.showModal()} theme='light' isLong>Subscribe</ControlButton>
            <SignInDialog
              thisRef={subscribeDialogRef}
              title='Want to subscribe to this channel?'
              text='Sign in to subscribe to this channel.'
            />
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
              {firebaseVideo && (
                <>
                  <button
                    className={`py-2 px-4 border-r border-neutral-500 rounded-l-full font-bold text-sm ${isVideoLiked ? 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'} flex items-center gap-1`}
                    onClick={auth ? () => handleLikeOnClick() : () => likeDialogRef.current.showModal()}
                    title={isVideoLiked ? 'Unlike' :'I like this'}
                  >
                    <img src={isVideoLiked ? LikeDark : LikeLight} alt='like' />
                    {/* {removeFloatingPointValue(parseInt(video.likes) + likes)} */}
                    {parseInt(video.likes) + firebaseVideo.likes}
                  </button>
                  <SignInDialog
                    thisRef={likeDialogRef}
                    title='Like this video?'
                    text='Sign in to make your opinion count.'
                  />

                  <button
                    className={`py-2 px-4 border-l border-neutral-500 rounded-r-full font-bold text-sm ${isVideoDisliked ? 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'} flex items-center gap-1`}
                    onClick={auth ? () => handleDislikeOnClick() : () => dislikedialogRef.current.showModal()}
                    title='I dislike this'
                  >
                    <img src={isVideoDisliked ? DislikeDark : DislikeLight} alt='dislike' />
                    {removeFloatingPointValue(firebaseVideo.dislikes)}
                  </button>
                  <SignInDialog
                    thisRef={dislikedialogRef}
                    title={`Don't like this video?`}
                    text='Sign in to make your opinion count.'
                  />
                </>
              )}
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



const SignInDialog = ({ thisRef, title, text }) => {
  const navigate = useNavigate();



  return (
    <dialog className='bg-neutral-800 py-4 pl-6 pr-28' ref={thisRef}>
      <div className='text-lg text-neutral-300'>{title}</div>
      <div className='mt-3 text-sm text-neutral-400'>{text}</div>
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

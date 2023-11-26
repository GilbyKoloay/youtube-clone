import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dots } from '../../assets/svg';



const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;



const ChannelImage = ({ channelId }) => {
  const [image, setImage] = useState('');



  useEffect(() => {
    getChannelImage();
  }, []);



  async function getChannelImage() {
    const req = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?key=${youtubeApiKey}&id=${channelId}&part=snippet%2CcontentDetails%2Cstatistics`);
    const res = await req.json();
    
    setImage(res?.items[0]?.snippet?.thumbnails?.high?.url);
  }



  return (
    <img
      className='h-10 w-10 rounded-full bg-neutral-500'
      src={image}
      alt='channel'
    />
  );
};



const VideoList = ({ videoList, getVideoList }) => {
  const navigate = useNavigate();



  useEffect(() => {
    handleScroll();

    const videoListWrapper = document.getElementById('video-list');
    if (videoListWrapper) videoListWrapper.addEventListener('scroll', handleScroll);

    return () => {
      const videoListWrapper = document.getElementById('video-list');
      if (videoListWrapper) videoListWrapper.removeEventListener('scroll', handleScroll);
    }
  }, []);



  // if the client has scrolled to the bottom of the browser, load more videos
  function handleScroll() {
    const videoListWrapper = document.getElementById('video-list');
    if (!videoListWrapper) return;

    const scrollableHeight = videoListWrapper.scrollHeight - videoListWrapper.clientHeight;
    const scrolled = videoListWrapper.scrollTop;
    const triggerPoint = 1.0 * scrollableHeight;

    if (scrolled >= triggerPoint) getVideoList();
  }

  function toProperDuration(value) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = value.match(regex);
    const properedValue = [];

    if (matches[1]) properedValue.push(matches[1].padStart(2, '0'));
    if (matches[2]) properedValue.push(matches[2].padStart(2, '0'));
    else properedValue.push('00');
    if (matches[3]) properedValue.push(matches[3].padStart(2, '0'));
    else properedValue.push('00');

    return properedValue.join(':');
  }

  function toProperView(value) {
    if (value.length > 9) return `${value.slice(0, 3)}.${value[3]}B`;
    if (value.length > 6) return `${value.slice(0, 3)}.${value[3]}M`;
    if (value.length > 3) return `${value.slice(0, 3)}K`;
    return value;
  }

  function toProperVideoUploadDate(value) {
    const currentDate = new Date();
    const valueDate = new Date(value);
    const diff = Math.floor((currentDate - valueDate) / 1000);

    const intervals = {
      year: diff / 31536000,
      month: diff / 2592000,
      week: diff / 604800,
      day: diff / 86400,
      hour: diff / 3600,
      minute: diff / 60,
    };

    if (intervals.year > 1) {
      const years = Math.floor(intervals.year);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
    else if (intervals.month > 1) {
      const months = Math.floor(intervals.month);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    else if (intervals.week > 1) {
      const weeks = Math.floor(intervals.week);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    else if (intervals.day > 1) {
      const days = Math.floor(intervals.day);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    else if (intervals.hour > 1) {
      const hours = Math.floor(intervals.hour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    else if (intervals.minute >= 6 && intervals.minute <= 60) {
      const minutes = Math.floor(intervals.minute);
      return `${minutes} minutes ago`;
    }
    else {
      return 'Few minutes ago';
    }
  }



  return videoList.map((video, index) => (
    <button
      key={index}
      className='mt-6 grid grid-rows-3'
      onClick={() => navigate(`/${video.id}`)}
    >
      <div className='row-span-2 relative'>
        <img
          className='h-full w-full aspect-video rounded-xl'
          src={video.thumbnail}
          alt='thumbnail'
        />
        <span className='absolute bottom-1 right-1 bg-black bg-opacity-80 p-1 font-bold text-right text-xs rounded'>{toProperDuration(video.duration)}</span>
      </div>

      <div className='mt-2 flex'>
        <ChannelImage channelId={video.channelId} />

        <div className='ml-3 flex-1 flex flex-col text-left'>
          <span className='font-bold line-clamp-2 text-ellipsis' title={video.title}>{video.title}</span>
          <span className='text-sm text-neutral-400 hover:text-neutral-200' title={video.channelName}>{video.channelName}</span>
          <span className='text-sm text-neutral-400'>{toProperView(video.views)} • {toProperVideoUploadDate(video.publishedAt)}</span>
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
  ));
};



export default VideoList;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toProperCount, countDateDifference } from '../../functions';



const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;



const Videolist = ({ category }) => {
  const navigate = useNavigate();

  const [videoList, setVideoList] = useState([]);



  useEffect(() => {
    getVideos();
  }, []);



  async function getVideos() {
    const req = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=27&regionCode=MY&videoCategoryId=${category}&key=${youtubeApiKey}`);
    const res = await req.json();

    if (res.error) console.log('Unable to load video list.', res.error);
    else {
      const newVideos = res.items.map(item => ({
        id: item?.id,
        thumbnail: item?.snippet.thumbnails?.maxres?.url,
        duration: item?.contentDetails?.duration,
        title: item?.snippet?.localized?.title,
        channelName: item?.snippet?.channelTitle,
        views: item?.statistics?.viewCount,
        publishedAt: item?.snippet?.publishedAt
      }));

      setVideoList(prev => [...prev, ...newVideos]);
    }
  }



  return (
    <div className='flex-1 flex flex-col gap-2'>
      {videoList.map((video, index) => (
        <button
          key={index}
          className='flex'
          onClick={() => navigate(`/${video.id}`)}
        >
          <img
            className='h-24 aspect-video bg-neutral-500 rounded-lg'
            src={video.thumbnail}
            alt='thumbnail'
          />

          <div className='ml-2 text-start'>
            <div className='text-sm font-bold line-clamp-2'>{video.title}</div>
            <div className='mt-1 text-xs text-neutral-500'>{video.channelName}</div>
            <div className='text-xs text-neutral-500'>{toProperCount(video.views)} • {countDateDifference(video.publishedAt)}</div>
          </div>
        </button>
      ))}
    </div>
  );
};



export default Videolist;

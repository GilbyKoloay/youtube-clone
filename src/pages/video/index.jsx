import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Header, NavMaximized } from '../../components';
import Control from './Control';
import Description from './Description';
import Comments from './Comments';
import VideoList from './VideoList';



const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;



const Video = () => {
  const navigate = useNavigate();

  const [isNavbarShown, setIsNavbarShown] = useState(false);
  const [video, setVideo] = useState(null);

  const { id } = useParams();

  

  useEffect(() => {
    checkVideoExistence();
  }, [id]);



  async function checkVideoExistence() {
    const req = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${youtubeApiKey}&id=${id}&part=snippet%2CcontentDetails%2Cstatistics`);
    const res = await req.json();

    if (res.error) console.log('Unable to load video.', res.error);
    else if (res.items.length === 0) navigate('/not-found');
    else {
      const newVideo = {
        id,
        player: res.items[0]?.player,
        title: res.items[0]?.snippet?.localized?.title,
        channelId: res.items[0]?.snippet?.channelId,
        channelName: res.items[0]?.snippet?.channelTitle,
        subscribers: '',
        likes: res.items[0]?.statistics?.likeCount,
        views: res.items[0]?.statistics?.viewCount,
        publishedAt: res.items[0]?.snippet?.publishedAt,
        description: res.items[0]?.snippet?.description,
        comments: res.items[0]?.statistics?.commentCount,
        category: res.items[0]?.snippet?.categoryId
      };
      setVideo(newVideo);

      document.title = newVideo.title;
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
              {video && (
                <iframe
                  title={video.id}
                  className='bg-neutral-500 h-128 aspect-video rounded-xl'
                  src={`//www.youtube.com/embed/${video.id}`}
                  frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen={true}
                />
              )}
              <div className='flex flex-col gap-3'>
                {video ? (
                  <div className='text-lg font-bold'>{video.title}</div>
                ) : (
                  <div className='w-1/2 p-3 bg-neutral-800 rounded-sm' />
                )}
                <Control video={video} setVideo={setVideo} />
                <Description video={video} />
                {video && <Comments video={video} />}
              </div>
            </div>
            {video && <VideoList category={video.category} />}
          </div>
        </div>
      </div>
    </div>
  );
};



export default Video;

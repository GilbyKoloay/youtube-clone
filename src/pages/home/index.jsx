import { useState, useEffect } from 'react';

import { Header, NavMaximized, NavMinimized } from '../../components';
import CategoryList from './CategoryList';
import VideoList from './VideoList';
import VideoListLoading from './VideoListLoading';



const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;



const Home = () => {
  const [navbarSize, setNavbarSize] = useState('maximized');
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('0');
  const [videoList, setVideoList] = useState([]);



  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getVideoList();
  }, [selectedCategoryId]);



  function changeNavbarSize() {
    if (navbarSize === 'maximized') setNavbarSize('minimized');
    else setNavbarSize('maximized');
  }

  async function getCategoryList() {
    const req = await fetch(`https://www.googleapis.com/youtube/v3/videoCategories?key=${youtubeApiKey}&regionCode=MY`);
    const res = await req.json();

    if (res.error) console.log('Unabe to load video categories.', res.error);
    else if (res.items) {
      const newCategoryList = res.items.map(item => ({
        id: item?.id,
        name: item?.snippet?.title
      }));

      setCategoryList(newCategoryList);
    }
  }

  function handleCategoryOnClick(id) {
    setSelectedCategoryId(id);
    setVideoList([]);
  }

  async function getVideoList() {
    const req = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?key=${youtubeApiKey}&regionCode=MY${selectedCategoryId ? `&videoCategoryId=${selectedCategoryId}` : ''}&chart=mostPopular&maxResults=9&part=snippet%2CcontentDetails%2Cstatistics`);
    const res = await req.json();
    
    if (res.error) console.log('Unable to load videos.', res.error);
    else if (res.items) {
      const newVideos = res.items.map(item => ({
        id: item?.id,
        thumbnail: item?.snippet.thumbnails?.maxres?.url,
        duration: item?.contentDetails?.duration,
        title: item?.snippet?.localized?.title,
        channelId: item?.snippet?.channelId,
        channelName: item?.snippet?.channelTitle,
        views: item?.statistics?.viewCount,
        publishedAt: item?.snippet?.publishedAt
      }));
      
      setVideoList(prev => [...prev, ...newVideos]);
    }
  }



  return (
    <div className='h-screen flex flex-col'>
      <Header burgerOnClick={changeNavbarSize} />
      <div className='flex-1 flex overflow-auto'>
        {(navbarSize === 'maximized') && <NavMaximized />}
        {(navbarSize === 'minimized') && <NavMinimized />}
        
        <main className='pt-3 pb-8 pl-8 flex-1 overflow-auto flex flex-col'>
          <CategoryList
            categoryList={categoryList}
            handleCategoryOnClick={handleCategoryOnClick}
            selectedCategoryId={selectedCategoryId}
          />
          <div id='video-list' className='pr-8 flex-1 mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-3 gap-x-4 overflow-auto'>
            <VideoList videoList={videoList} getVideoList={getVideoList} />
            <VideoListLoading />
          </div>
        </main>
      </div>
    </div>
  );
};



export default Home;

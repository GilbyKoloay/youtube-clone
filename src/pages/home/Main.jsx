import { Dots } from '../../assets/svg';



const CategoryList = () => {
  return (
    <div className='mr-8 flex gap-3 overflow-x-auto'>
      <CategoryButton isActive>All</CategoryButton>
      <CategoryButton>Animation & Film</CategoryButton>
      <CategoryButton>Autos & Vehicles</CategoryButton>
      <CategoryButton>Music Videos</CategoryButton>
      <CategoryButton>Pets & Animals</CategoryButton>
      <CategoryButton>Sports</CategoryButton>
      <CategoryButton>Travel & Events</CategoryButton>
      <CategoryButton>Sports</CategoryButton>
      <CategoryButton>Gaming</CategoryButton>
      <CategoryButton>People & Blogs</CategoryButton>
      <CategoryButton>Comedy</CategoryButton>
      <CategoryButton>Entertainment</CategoryButton>
      <CategoryButton>News & Politics</CategoryButton>
      <CategoryButton>How to & Style</CategoryButton>
      <CategoryButton>Education</CategoryButton>
      <CategoryButton>Science & Technology</CategoryButton>
      <CategoryButton>NonProfit & Activism</CategoryButton>
    </div>
  );
};

const CategoryButton = ({ children, isActive }) => {
  return <button className={`font-bold text-sm py-2 px-3 rounded-lg ${isActive ? 'bg-neutral-200 text-neutral-800 hover:bg-neutral-100' : 'bg-neutral-800 hover:bg-neutral-700'} whitespace-nowrap duration-200`}>{children}</button>
};



const VideoList = ({ videoList=null }) => {
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
        {[...new Array(9)].map((video, index) => (
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
      {[...videoList, ...videoList, ...videoList, ...videoList, ...videoList].map((video, index) => (
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



const Main = () => {
  return (
    <main className='pt-3 pb-8 pl-8 flex-1 overflow-auto flex flex-col'>
      <CategoryList />
      <VideoList />
    </main>
  );
};



export default Main;

const VideoListLoading = () => {
  return (
    <>
      {[...new Array(3)].map((_, index) => (
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
    </>
  );
};



export default VideoListLoading;

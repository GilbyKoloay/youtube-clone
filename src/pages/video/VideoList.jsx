const Videolist = () => {
  return (
    <div className='bg-green-500 flex-1'>
      {[...new Array(6)].map((_, index) => <div key={index}>video list</div>)}
    </div>
  );
};



export default Videolist;

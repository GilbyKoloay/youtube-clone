import { Filter } from '../../assets/svg';
import { ProfileColored } from '../../assets/img';



const Comments = ({ video }) => {
  return (
    <div>
      <div className='flex items-center gap-8'>
        <span className='text-xl font-bold'>{video.comments.length} Comments</span>
        <button className='flex items-center gap-2' title='Sort comments'>
          <img src={Filter} alt='filter' />
          <span className='font-bold text-sm'>Sort By</span>
        </button>
      </div>

      <div className='mt-8 flex flex-col gap-4'>
        <form className='mb-4 flex items-start gap-4'>
          <img
            className='h-10 w-10 rounded-full'
            src={ProfileColored}
            alt='profile'
          />
          <input className='text-sm bg-transparent w-full border-b border-neutral-700' placeholder='Add a comment...' />
        </form>

        {video.comments.map((comment, index) => (
          <CommentItem
            key={index}
            img={comment.img}
            profile={comment.profile}
            dateTime={comment.dateTime}
            comment={comment.comment}
          />
        ))}
      </div>
    </div>
  );
};

const CommentItem = ({
  img,
  profile,
  dateTime,
  comment
}) => {
  return (
    <div className='flex gap-4'>
      <div className='h-10 w-10 rounded-full bg-neutral-500' />

      <div className='flex flex-col gap-2'>
        <button className='flex items-center gap-1'>
          <span className='text-xs font-bold'>{profile}</span>
          <span className='text-xs text-neutral-400'>{dateTime}</span>
        </button>
        <p className='text-sm'>{comment}</p>
      </div>
    </div>
  );
};



export default Comments;

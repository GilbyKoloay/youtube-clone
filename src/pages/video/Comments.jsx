import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Filter,
  LikeLight,
  DislikeLight,
  TriangleDown
} from '../../assets/svg';
import { ProfileColored } from '../../assets/img';
import { getVideoDoc, setVideo, getVideo } from '../../firebase';
import { toProperCount, countDateDifference } from '../../functions';
import { useAppState } from '../../hooks';



const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;



const Comments = ({ video }) => {
  const navigate = useNavigate();

  const { auth, user } = useAppState();

  const [firebaseVideo, setFirebasevideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [isCommentOnFocus, setIsCommentOnFocus] = useState(false);



  useEffect(() => {
    getComments();
    getVideo(video.id, setFirebasevideo);
  }, []);

  useEffect(() => {
    if (!auth) setComment('');
  }, [auth]);

  useEffect(() => {
    if (firebaseVideo) setComments(prev => [...firebaseVideo.comments, ...prev]);
  }, [firebaseVideo]);



  async function getComments() {
    const req = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&order=relevance&videoId=${video.id}&key=${youtubeApiKey}`);
    const res = await req.json();

    if (res.error) console.log('Unable to load comments.', res.error);
    else {
      const newComments = res.items.map(item => ({
        authorImg: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
        authorName: item.snippet.topLevelComment.snippet.authorDisplayName,
        publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
        comment: item.snippet.topLevelComment.snippet.textDisplay,
        likes: item.snippet.topLevelComment.snippet.likeCount,
        replies: item.snippet.totalReplyCount
      }));

      setComments(newComments);
    }
  }

  function handleCancelOnClick() {
    setComment('');
    setIsCommentOnFocus(false);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const newComment = {
      authorName: `${user.firstName}${user.lastName ? user.lastName : ''}`,
      publishedAt: getCurrentDate(),
      comment,
      likes: 0,
      replies: 0
    };
    let newVideoDoc = {};

    const prevVideoDoc = await getVideoDoc(video.id);
    if (!prevVideoDoc) {
      newVideoDoc = {
        likes: 0,
        dislikes: 0,
        comments: [newComment]
      };
    }
    else {
      newVideoDoc = {
        ...prevVideoDoc,
        comments: [...prevVideoDoc.comments, newComment]
      };
    }

    const res = await setVideo(video.id, newVideoDoc);

    if (!res?.error) {
      setComment('');
      setIsCommentOnFocus(false);
    }
  }

  function getCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }



  return (
    <div>
      <div className='flex items-center gap-8'>
        <span className='text-xl font-bold'>{parseInt(video.comments) + (firebaseVideo ? firebaseVideo.comments.length : 0)} Comments</span>
        <button className='flex items-center gap-2' title='Sort comments'>
          <img src={Filter} alt='filter' />
          <span className='font-bold text-sm'>Sort By</span>
        </button>
      </div>

      <div className='mt-8 flex flex-col gap-4'>
        <form
          onSubmit={handleOnSubmit}
          className='mb-4 flex items-start gap-4'
          onClick={auth ? null : () => navigate('/sign-in')}
        >
          <img
            className='h-10 w-10 rounded-full'
            src={ProfileColored}
            alt='profile'
          />
          <div className='w-full'>
            <input
              className='py-1 text-sm bg-transparent w-full border-b border-neutral-700 focus:border-neutral-100 outline-none'
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder='Add a comment...'
              onFocus={() => setIsCommentOnFocus(true)}
            />
            {isCommentOnFocus && (
              <div className='mt-1 flex justify-end text-sm gap-2 font-bold'>
                <button className='py-2 px-4 rounded-full hover:bg-neutral-700' onClick={handleCancelOnClick}>Cancel</button>
                <button
                  className={`py-2 px-4 rounded-full ${comment ? 'bg-cyan-500 text-neutral-900 hover:bg-cyan-400' : 'bg-neutral-800 text-neutral-400'}`}
                  type='submit'
                  disabled={!comment}
                >
                  Comment
                </button>
              </div>
            )}
          </div>
        </form>

        {comments.map((comment, index) => (
          <CommentItem
            key={index}
            img={comment.authorImg}
            name={comment.authorName}
            publishedAt={comment.publishedAt}
            comment={comment.comment}
            likes={comment.likes}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

const CommentItem = ({
  img,
  name,
  publishedAt,
  comment,
  likes,
  replies
}) => {
  return (
    <div className='flex gap-4'>
      {img ? (
        <img
          className='h-10 w-10 rounded-full bg-neutral-500'
          src={img}
          alt='channel'
        />
      ) : (
        <div className='h-10 w-10 rounded-full bg-neutral-500' />
      )}

      <div className='flex flex-col'>
        <button className='flex items-center gap-1'>
          <span className='text-xs font-bold'>@{name}</span>
          <span className='text-xs text-neutral-400 hover:text-neutral-100'>{countDateDifference(publishedAt)}</span>
        </button>
        <p className='mt-2 text-sm'>{comment}</p>

        <div className='mt-1 flex items-center'>
          <button className='p-1 hover:bg-neutral-800 rounded-full'>
            <img src={LikeLight} alt='like' />
          </button>
          <span className='ml-1 text-sm text-neutral-400'>{toProperCount(likes ? likes : '0')}</span>
          <button className='ml-2 p-1 hover:bg-neutral-800 rounded-full'>
            <img src={DislikeLight} alt='dark' />
          </button>
        </div>

        <div>
          <button className='p-2 rounded-full flex items-center gap-1 hover:bg-cyan-950 opacity-90'>
            <img
              className='h-6 w-6'
              src={TriangleDown}
              alt='arrow-down'
            />
            <span className='text-sm font-bold' style={{color: '#3ea6ff'}}>{replies} replies</span>
          </button>
        </div>
      </div>
    </div>
  );
};



export default Comments;

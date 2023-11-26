import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Like,
  Dislike,
  Share,
  Download,
  Dots,
  Videos,
  ProfileRectangle,
  Filter
} from '../../assets/svg';
import { ProfileColored } from '../../assets/img';



const title = 'Bajak Laut Topi Jerami Vs Doflaminggo!! SELURUH ALUR CERITA ONE PIECE ARC DRESSROSA Lengkap';
const channelName = 'MOVIE SENPAI 2';
const subscribers = 119;
const likes = 123;
const dislikes = 456;
const views = 62;
const uploadDateTime = '16 hours ago';
const tags = ['#alurcerita', '#alurceritaanime', '#alurceritaanimveoverpower'];
const description = `Season kedua Jujutsu Kaisen ini akan menceritakan mengenai masa lalu Gojo dan Arc Insiden Shibuya. Masa lalu Gojo Satoru dimulai sejak 11 tahun sebelum Yuji Itadori masuk SMA Jujutsu Tokyo. Gojo Satoru bersahabat dengan Suguru Geto, yakni sama-sama murid kedua di SMA Jujutsu Tokyo yang menerima tugas dari master Tengen untuk mengantar Riko Amanai kembali ke sekolah.
Karakter bernama Riko Amanai ternyata seorang Star Plasma, yakni manusia yang cocok dengan Master Tengen yang perlu berpindah tubuh setiap 500 tahun sekali. Namun banyak kelompok menghalangi misinya. Gojo dan Suguro harus bertarung menjaga Riko dan membuat Gojo harus bisa melawan Toji Fushiguro dan beragam kutukan lainnya.
Selepas kejadian itu, Jujutsu Kaisen season 2 akan membahas mengenai Shibuya Incident Arc yakni rencana utama Geto dan Mahito untuk menyegel roh terkutuk bernama Saturo Gojo. Rencana ini dilakukan untuk melindungi umat manusia hingga segelnya Arc ini.
#alurcerita #alurceritaanime #alurceritaanimeoverpower #animeoverpower #animeterbaru2023 #recapanime #bahasanime #jujutsukaisen #jujutsukaisenseason2 #reviewanime
Transcript`;
const comments = [
  {profile: '@fitryyusub107', dateTime: '12 hours ago', comment: '0:12'},
  {profile: '@anwarhidayat558', dateTime: '1 hours ago', comment: 'Halo bang'},
]



const Control = () => {
  const subscribeDialogRef = useRef();



  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center'>
        <div className='h-10 w-10 bg-neutral-500 rounded-full' />
        <div className='ml-3 mr-6'>
          <div className='font-bold'>{channelName}</div>
          <div className='text-xs text-neutral-500'>{subscribers} subscribers</div>
        </div>
        <SubscribeDialog thisRef={subscribeDialogRef} />
        <ControlButton onClick={() => subscribeDialogRef.current.showModal()} theme='light' isLong>Subscribe</ControlButton>
      </div>

      <div className='flex gap-2'>
        <div className='flex items-center'>
          <button className='py-2 px-4 border-r border-neutral-500 rounded-l-full font-bold text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center gap-1' title='I like this'>
            <img src={Like} alt='like' />
            {likes}
          </button>
          <button className='py-2 px-4 border-l border-neutral-500 rounded-r-full font-bold text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center gap-1' title='I dislike this'>
            <img src={Dislike} alt='dislike' />
            {dislikes}
          </button>
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
    </div>
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



const SubscribeDialog = ({ thisRef }) => {
  const navigate = useNavigate();



  return (
    <dialog className='bg-neutral-800 py-4 pl-6 pr-28' ref={thisRef}>
      <div className='text-lg text-neutral-300'>Want to subscribe to this channel?</div>
      <div className='mt-3 text-sm text-neutral-400'>Sign in to subscribe to this channel.</div>
      <button className='text-sm mt-10 py-2 px-4 rounded-full hover:bg-cyan-900 text-blue-500' onClick={() => navigate('/sign-in')}>Sign in</button>
    </dialog>
  );
};



const Description = () => {
  const [isExpanded, setIsExpanded] = useState(false);



  return (
    <div className={`py-2 px-3 bg-neutral-800 rounded-xl ${!isExpanded ? 'hover:bg-neutral-700 cursor-pointer' : ''}`} onClick={!isExpanded ? () => setIsExpanded(true) : null}>
      <div className='flex gap-2'>
        <span className='font-bold text-sm'>{views} views</span>
        <span className='font-bold text-sm'>{uploadDateTime}</span>
        {tags.map((tag, index) => <span key={index} className='font-bold text-sm text-neutral-400'>{tag}</span>)}
      </div>

      <p className={`text-sm ${!isExpanded ? 'line-clamp-3' : ''}`}>{description}</p>
      {!isExpanded && <span className='font-bold text-sm'> ...more</span>}

      {isExpanded && (
        <>
          <div className='mt-8 flex items-center gap-2'>
            <div className='h-16 w-16 rounded-full bg-neutral-500' />
            <div className='flex flex-col'>
              <span className='font-bold text-lg'>{channelName}</span>
              <span className='text-sm'>{subscribers} subscribers</span>
            </div>
          </div>

          <div className='mt-4 w-5/6 flex gap-3'>
            <DescriptionButton>
              <img
                className='h-6'
                src={Videos}
                alt='videos'
              />
              Videos
            </DescriptionButton>
            <DescriptionButton>
              <img
                className='h-6'
                src={ProfileRectangle}
                alt='About'
              />
              About
            </DescriptionButton>
          </div>

          <button className='mt-12 font-bold text-sm' onClick={() => setIsExpanded(false)}>Show less</button>
        </>
      )}
    </div>
  );
};



const DescriptionButton = ({ children }) => {
  return <button className='w-full py-1 flex justify-center items-center gap-2 border hover:bg-neutral-600 border-neutral-600 rounded-full text-sm font-bold'>{children}</button>
}



const Comments = () => {
  return (
    <div>
      <div className='flex items-center gap-8'>
        <span className='text-xl font-bold'>{comments.length} Comments</span>
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

        {comments.map((comment, index) => (
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
  )
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



const VideoDetail = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='text-lg font-bold'>{title}</div>
      <Control />
      <Description />
      <Comments />
    </div>
  );
};



export default VideoDetail;

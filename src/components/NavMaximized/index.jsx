import { useNavigate, useLocation } from 'react-router-dom';

import {
  Home,
  Shorts,
  Subscriptions,
  Gallery,
  History,
  Trending,
  Music,
  Movies,
  Gaming,
  News,
  Trophy,
  Add,
  YouTubePremium,
  YouTubeMusic,
  YouTubeKids,
  Settings,
  Flag,
  Help,
  Feedback
} from '../../assets/svg';
import { useAppState } from '../../hooks';
import { SignInButton } from '../';



const Button = ({
  imgSrc,
  onClick,
  children,
  isActive
}) => {
  return (
    <button className={`w-full py-2 px-3 rounded-lg flex items-center gap-6 ${isActive ? 'bg-neutral-800 hover:bg-neutral-700' : 'hover:bg-neutral-800'}`} onClick={onClick}>
      <img src={imgSrc} alt='item-img' className='max-h-8' />
      <span className={`text-sm ${isActive ? 'font-bold' : ''} whitespace-nowrap`}>{children}</span>
    </button>
  );
};



const Hr = () => {
  return <hr className='border-neutral-700' />
};



const BottomSectionButton = ({ children }) => {
  return <button className='text-xs font-bold text-neutral-400 whitespace-nowrap'>{children}</button>
};



const NavMaximized = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { auth } = useAppState();



  return (
    <nav className='overflow-auto' style={{backgroundColor: '#0f0f0f'}}>
      <section className='p-3'>
        <Button
          imgSrc={Home}
          onClick={() => navigate('/')}
          isActive={pathname === '/'}
        >
          Home
        </Button>
        <Button imgSrc={Shorts}>Shorts</Button>
        <Button imgSrc={Subscriptions}>Subscriptions</Button>
      </section>

      <Hr />

      <section className='p-3'>
        <Button imgSrc={Gallery}>You</Button>
        <Button imgSrc={History}>History</Button>
      </section>

      <Hr />

      {!auth && (
        <>
          <section className='py-4 px-8 flex flex-col'>
            <span className='text-sm'>Sign in to like videos,</span>
            <span className='text-sm mb-3'>comment, and subscribe.</span>
            <SignInButton />
          </section>

          <Hr />
        </>
      )}

      <section className='p-3'>
        <span className='ml-3 font-bold'>Explore</span>
        <Button imgSrc={Trending}>Trending</Button>
        <Button imgSrc={Music}>Music</Button>
        <Button imgSrc={Movies}>Movies</Button>
        <Button imgSrc={Gaming}>Gaming</Button>
        <Button imgSrc={News}>News</Button>
        <Button imgSrc={Trophy}>Sports</Button>
      </section>

      <Hr />

      <section className='p-3'>
        <Button imgSrc={Add}>Browse channels</Button>
      </section>

      <Hr />

      <section className='p-3'>
        <span className='ml-3 font-bold'>More from YouTube</span>
        <Button imgSrc={YouTubePremium}>YouTube Premium</Button>
        <Button imgSrc={YouTubeMusic}>YouTube Music</Button>
        <Button imgSrc={YouTubeKids}>YouTube Kids</Button>
      </section>

      <Hr />

      <section className='p-3'>
        <Button imgSrc={Settings}>Settings</Button>
        <Button imgSrc={Flag}>Report hitory</Button>
        <Button imgSrc={Help}>Help</Button>
        <Button imgSrc={Feedback}>Send feedback</Button>
      </section>

      <Hr />

      <section className='py-3 pl-6 pr-3'>
        <div className='flex gap-2'>
          <BottomSectionButton>About</BottomSectionButton>
          <BottomSectionButton>Press</BottomSectionButton>
          <BottomSectionButton>Copyright</BottomSectionButton>
        </div>
        <div className='flex gap-2'>
          <BottomSectionButton>Contact us</BottomSectionButton>
          <BottomSectionButton>Creators</BottomSectionButton>
        </div>
        <div className='flex gap-2'>
          <BottomSectionButton>Advertise</BottomSectionButton>
          <BottomSectionButton>Developers</BottomSectionButton>
        </div>
        <div className='mt-3 flex gap-2'>
          <BottomSectionButton>Terms</BottomSectionButton>
          <BottomSectionButton>Privacy</BottomSectionButton>
          <BottomSectionButton>Policy & Safety</BottomSectionButton>
        </div>
        <div className='flex gap-2'>
          <BottomSectionButton>How YouTube works</BottomSectionButton>
        </div>
        <div className='flex gap-2'>
          <BottomSectionButton>Test new features</BottomSectionButton>
        </div>

        <div className='mt-4 text-xs text-neutral-500'>© 2023 Google LLC</div>
      </section>
    </nav>
  );
};



export default NavMaximized;

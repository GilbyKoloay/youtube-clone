import { useNavigate } from 'react-router-dom';

import { ProfileEllipseBlue } from '../../assets/svg';



const SignInButton = () => {
  const navigate = useNavigate();



  return (
    <button className='py-1 px-2 border border-neutral-700 rounded-full flex gap-1 justify-evenly items-center hover:bg-cyan-900' onClick={() => navigate('/sign-in')}>
      <img src={ProfileEllipseBlue} alt='profile' />
      <span className='text-sm text-blue-500 font-bold'>Sign in</span>
    </button>
  );
};



export default SignInButton;

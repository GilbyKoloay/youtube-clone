import { useNavigate } from 'react-router-dom';

import { Profile } from '../../assets/svg';



const SignInButton = () => {
  const navigate = useNavigate();



  return (
    <button className='w-24 py-1 border border-neutral-700 rounded-full flex justify-evenly items-center hover:bg-cyan-900' onClick={() => navigate('/sign-in')}>
      <img src={Profile} alt='profile' />
      <span className='text-sm text-blue-500 font-bold'>Sign in</span>
    </button>
  );
};



export default SignInButton;

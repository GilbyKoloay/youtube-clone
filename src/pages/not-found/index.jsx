import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { YouTubeDark } from '../../assets/svg';
import { Monkey } from '../../assets/img';



const NotFound = () => {
  const navigate = useNavigate();



  useEffect(() => {
    setTimeout(() => navigate('/'), 2500);
  }, []);



  return (
    <div className='h-screen flex flex-col justify-center items-center' style={{backgroundColor: '#f1f1f1', color: '#0f0f0f'}}>
      <img src={Monkey} alt='monkey' />
      <span className='mt-2'>This page isn't available. Sorry about that.</span>
      <span>Redirecting you to home page...</span>
      <img
        className='mt-4 h-6'
        src={YouTubeDark}
        alt='youtube'
      />
    </div>
  );
};



export default NotFound;

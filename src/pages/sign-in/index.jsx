import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EmailOrPhone from './EmailOrPhone';
import Password from './Password';



const SignIn = () => {
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  



  function handleEmailOrPhoneOnSubmit(e) {
    e.preventDefault();
    setIsEmailValid(true);
  }

  function handleEmailOnClick() {
    setIsEmailValid(false);
    setPassword('');
    setIsPasswordHidden(true);
  }

  function handlePasswordOnSubmit(e) {
    e.preventDefault();
    navigate('/');
  }



  return (
    <div className='h-screen flex justify-center items-center' style={{backgroundColor: '#ffffff', color: '#000000'}}>
      {!isEmailValid ? (
        <EmailOrPhone
          onSubmit={handleEmailOrPhoneOnSubmit}
          emailOrPhone={emailOrPhone}
          setEmailOrPhone={setEmailOrPhone}
          handleCreateAccountOnClick={() => navigate('/sign-up')}
        />
      ) : (
        <Password
          onSubmit={handlePasswordOnSubmit}
          emailOrPhone={emailOrPhone}
          handleEmailOnClick={handleEmailOnClick}
          password={password}
          setPassword={setPassword}
          isPasswordHidden={isPasswordHidden}
          setIsPasswordHidden={setIsPasswordHidden}
        />
      )}
    </div>
  );
};



export default SignIn;

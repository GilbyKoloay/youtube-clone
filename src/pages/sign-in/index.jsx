import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isEmailAlreadyExist as isEmailAlreadyExistFunc, signIn } from '../../firebase';
import EmailOrPhone from './EmailOrPhone';
import Password from './Password';



const SignIn = () => {
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [emailOrPhoneErrMsg, setEmailOrPhoneErrMsg] = useState('');
  const [isEmailOrPhoneValid, setIsEmailOrPhoneValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);



  useEffect(() => {
    document.title = 'YouTube';
  }, []);

  useEffect(() => {
    setEmailOrPhoneErrMsg('');
  }, [emailOrPhone]);

  useEffect(() => {
    setPasswordErrMsg('');
  }, [password]);



  async function handleEmailOrPhoneOnSubmit(e) {
    e.preventDefault();
    
    if (!emailOrPhone) setEmailOrPhoneErrMsg('Enter an email or phone number');
    else {
      const isEmailAlreadyExist = await isEmailAlreadyExistFunc(emailOrPhone);

      if (isEmailAlreadyExist.error) setEmailOrPhoneErrMsg(isEmailAlreadyExist.error);
      else if (isEmailAlreadyExist.length === 0) setEmailOrPhoneErrMsg('Couldn\'t find your Google Account');
      else setIsEmailOrPhoneValid(true);
    }
  }

  function handleEmailOnClick() {
    setEmailOrPhoneErrMsg('');
    setIsEmailOrPhoneValid(false);
    setPassword('');
    setPasswordErrMsg('');
    setIsPasswordHidden(true);
  }

  async function handlePasswordOnSubmit(e) {
    e.preventDefault();
    
    if (!password) setPasswordErrMsg('Enter a password');
    else {
      const isUserSignedIn = await signIn(emailOrPhone, password);

      if (isUserSignedIn.error) setPasswordErrMsg('Wrong password. Try again.');
      else navigate('/');
    }
  }



  return (
    <div className='h-screen flex justify-center items-center' style={{backgroundColor: '#ffffff', color: '#000000'}}>
      {!isEmailOrPhoneValid ? (
        <EmailOrPhone
          onSubmit={handleEmailOrPhoneOnSubmit}
          emailOrPhone={emailOrPhone}
          setEmailOrPhone={setEmailOrPhone}
          emailOrPhoneErrMsg={emailOrPhoneErrMsg}
          handleCreateAccountOnClick={() => navigate('/sign-up')}
        />
      ) : (
        <Password
          onSubmit={handlePasswordOnSubmit}
          emailOrPhone={emailOrPhone}
          handleEmailOnClick={handleEmailOnClick}
          password={password}
          setPassword={setPassword}
          passwordErrMsg={passwordErrMsg}
          isPasswordHidden={isPasswordHidden}
          setIsPasswordHidden={setIsPasswordHidden}
        />
      )}
    </div>
  );
};



export default SignIn;

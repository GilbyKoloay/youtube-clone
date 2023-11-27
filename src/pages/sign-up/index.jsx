import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isEmailAlreadyExist as isEmailAlreadyExistFunc, signUp, postUser } from '../../firebase';
import Name from './Name';
import Email from './Email';
import Password from './Password';



const SignUp = () => {
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState('');
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [lastName, setLastName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);



  useEffect(() => {
    setFirstNameErrMsg('');
  }, [firstName]);

  useEffect(() => {
    setEmailErrMsg('');
  }, [email]);

  useEffect(() => {
    setPasswordErrMsg('');
  }, [password]);

  useEffect(() => {
    setConfirmPasswordErrMsg('');
  }, [confirmPassword]);



  function handleNameOnSubmit(e) {
    e.preventDefault();
    
    if (!firstName) setFirstNameErrMsg('Enter first name');
    else setIsNameValid(true);
  }

  async function handleEmailOnSubmit(e) {
    e.preventDefault();
    
    if (!email) setEmailErrMsg('Required field cannot be left blank');
    else {
      const isEmailAlreadyExist = await isEmailAlreadyExistFunc(email);
      
      if (isEmailAlreadyExist.error) setEmailErrMsg(isEmailAlreadyExist.error);
      else if (isEmailAlreadyExist.length > 0) setEmailErrMsg('Email already exist');
      else setIsEmailValid(true);
    }
  }

  async function handlePasswordOnSubmit(e) {
    e.preventDefault();
    
    if (!password) setPasswordErrMsg('Enter a password');
    else if (!confirmPassword) setConfirmPasswordErrMsg('Confirm your password');
    else if (password !== confirmPassword) setConfirmPasswordErrMsg('Those passwords didn\'t match. Try again.');
    else {
      const isUserSignedUp = await signUp(email, password);
      
      if (!isUserSignedUp.error) {
        postUser({
          email,
          password,
          firstName,
          lastName: lastName ? lastName : null,
          likedVideos: [],
          dislikedVideos: []
        });
        navigate('/');
      }
    }
  }



  return (
    <div className='h-screen flex justify-center items-center' style={{backgroundColor: '#ffffff', color: '#000000'}}>
      {!isNameValid ? (
        <Name
          onSubmit={handleNameOnSubmit}
          firstName={firstName}
          setFirstName={setFirstName}
          firstNameErrMsg={firstNameErrMsg}
          lastName={lastName}
          setLastName={setLastName}
        />
      ) : !isEmailValid ? (
        <Email
          onSubmit={handleEmailOnSubmit}
          email={email}
          setEmail={setEmail}
          emailErrMsg={emailErrMsg}
        />
      ) : (
        <Password
          onSubmit={handlePasswordOnSubmit}
          password={password}
          setPassword={setPassword}
          passwordErrMsg={passwordErrMsg}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          confirmPasswordErrMsg={confirmPasswordErrMsg}
          isPasswordHidden={isPasswordHidden}
          setIsPasswordHidden={setIsPasswordHidden}
        />
      )}
    </div>
  );
};



export default SignUp;

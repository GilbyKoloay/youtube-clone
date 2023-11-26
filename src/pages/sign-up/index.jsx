import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Name from './Name';
import Email from './Email';
import Password from './Password';



const SignUp = () => {
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);




  function handleNameOnSubmit(e) {
    e.preventDefault();
    setIsFirstNameValid(true);
  }

  function handleEmailOnSubmit(e) {
    e.preventDefault();
    setIsEmailValid(true);
  }

  function handlePasswordOnSubmit(e) {
    e.preventDefault();
    navigate('/');
  }



  return (
    <div className='h-screen flex justify-center items-center' style={{backgroundColor: '#ffffff', color: '#000000'}}>
      {!isFirstNameValid ? (
        <Name
          onSubmit={handleNameOnSubmit}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
        />
      ) : !isEmailValid ? (
        <Email
          onSubmit={handleEmailOnSubmit}
          email={email}
          setEmail={setEmail}
        />
      ) : (
        <Password
          onSubmit={handlePasswordOnSubmit}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          isPasswordHidden={isPasswordHidden}
          setIsPasswordHidden={setIsPasswordHidden}
        />
      )}
    </div>
  );
};



export default SignUp;

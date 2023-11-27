import SignForm from '../../components/SignForm';



const EmailOrPhone = ({
  onSubmit,
  emailOrPhone,
  setEmailOrPhone,
  emailOrPhoneErrMsg,
  handleCreateAccountOnClick
}) => {
  return (
    <SignForm.Form onSubmit={onSubmit}>
      <SignForm.Title>Sign in</SignForm.Title>
      <SignForm.Subtitle>to continue to YouTube</SignForm.Subtitle>

      <SignForm.InputWrapper>
        <SignForm.Input
          value={emailOrPhone}
          onChange={setEmailOrPhone}
          placeholder='Email or phone'
          errMsg={emailOrPhoneErrMsg}
        />
      </SignForm.InputWrapper>
      <button className='mt-2 text-sm text-blue-500 font-bold text-left self-start'>Forgot email?</button>
      
      <span className='mt-10 self-start text-sm text-neutral-500'>Not your computer? Use Guest mode to sign in privately.</span>
      <button className='text-sm text-blue-500 font-bold text-left self-start'>Learn more</button>

      <SignForm.ButtonWrapper>
        <SignForm.Button onClick={handleCreateAccountOnClick}>Create account</SignForm.Button>
        <SignForm.Button isThemePrimary type='submit'>Next</SignForm.Button>
      </SignForm.ButtonWrapper>
    </SignForm.Form>
  );
};



export default EmailOrPhone;

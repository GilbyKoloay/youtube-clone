import SignForm from '../../components/SignForm';



const Password = ({
  onSubmit,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isPasswordHidden,
  setIsPasswordHidden
}) => {
  return (
    <SignForm.Form onSubmit={onSubmit}>
      <SignForm.Title>Create a strong password</SignForm.Title>
      <SignForm.Subtitle>Create a strong password with a mix of letters, numbers and symbols</SignForm.Subtitle>

      <SignForm.InputWrapper>
        <SignForm.Input
          value={password}
          onChange={setPassword}
          placeholder='Password'
        />
        <SignForm.Input
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder='Confirm'
        />
      </SignForm.InputWrapper>
      <label className='self-start mt-2 hover:cursor-pointer flex items-center gap-4 text-sm'>
        <input
          className='h-4 w-4'
          onChange={() => setIsPasswordHidden(!isPasswordHidden)}
          type='checkbox'
        />
        Show password
      </label>

      <SignForm.ButtonWrapper>
        <div />
        <SignForm.Button isThemePrimary type='submit'>Next</SignForm.Button>
      </SignForm.ButtonWrapper>
    </SignForm.Form>
  );
};



export default Password;

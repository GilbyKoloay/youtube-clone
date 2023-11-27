import { ProfileEllipse, ArrowDown } from '../../assets/svg';
import SignForm from '../../components/SignForm';



const Password = ({
  onSubmit,
  emailOrPhone,
  handleEmailOnClick,
  password,
  setPassword,
  passwordErrMsg,
  isPasswordHidden,
  setIsPasswordHidden
}) => {
  return (
    <SignForm.Form onSubmit={onSubmit}>
      <SignForm.Title>Welcome</SignForm.Title>
      <button
        className='mt-2 mb-10 py-1 px-3 border border-neutral-300 rounded-full text-sm flex items-center gap-2 hover:bg-neutral-100'
        onClick={handleEmailOnClick}
        type='button'
      >
        <img src={ProfileEllipse} alt='profile' />
        {emailOrPhone}
        <img
          className='h-4'
          src={ArrowDown}
          alt='drop-down'
        />
      </button>

      <SignForm.InputWrapper>
        <SignForm.Input
          value={password}
          onChange={setPassword}
          placeholder='Enter your password'
          hidden={isPasswordHidden}
          errMsg={passwordErrMsg}
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
        <SignForm.Button>Forgot password?</SignForm.Button>
        <SignForm.Button isThemePrimary type='submit'>Next</SignForm.Button>
      </SignForm.ButtonWrapper>
    </SignForm.Form>
  );
};



export default Password;

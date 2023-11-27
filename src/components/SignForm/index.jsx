import { Google } from '../../assets/svg';



const Title = ({ children }) => {
  return <span className='mt-5 text-2xl text-center'>{children}</span>
};



const Subtitle = ({ children }) => {
  return <span className='mt-2 text-center'>{children}</span>
}



const InputWrapper = ({ children }) => {
  return <div className='w-full mt-8 flex flex-col gap-6'>{children}</div>
};



const Input = ({
  value,
  onChange,
  placeholder,
  errMsg,
  hidden,
}) => {
  return (
    <div>
      <input
        className={`w-full border border-neutral-300 ${errMsg ? 'outline outline-2 outline-red-500' : 'focus:outline-2 focus:outline-blue-500'} rounded p-4`}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        type={hidden ? 'password' : 'text'}
      />
      {errMsg && (
        <div className='mt-1 flex items-center gap-2'>
          <span className='bg-red-500 rounded-full' style={{color: '#f1f1f1', fontSize: 10, paddingLeft: 6, paddingRight: 6}}>!</span>
          <span className='text-red-500 text-xs'>{errMsg}</span>
        </div>
      )}
    </div>
  );
};



const ButtonWrapper = ({ children }) => {
  return <div className='mt-10 w-full flex justify-between'>{children}</div>
};



const Button = ({
  children,
  onClick,
  isThemePrimary=false,
  type='button'
}) => {
  return (
    <button
      className={`${isThemePrimary ? 'bg-blue-600 text-neutral-50 hover:bg-blue-700' : 'bg-neutral-50 text-blue-500 hover:bg-blue-50 hover:text-blue-600'} text-sm font-bold py-2 px-6 rounded`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
};



const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className='w-96 pt-14 pb-20 px-8 border border-neutral-300 rounded-lg flex flex-col items-center'>
      <img src={Google} alt='google' />
      {children}
    </form>
  );
};



const Export = {
  Form,
  Title,
  Subtitle,
  InputWrapper,
  Input,
  ButtonWrapper,
  Button
};

export default Export;

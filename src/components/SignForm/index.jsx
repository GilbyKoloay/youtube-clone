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
  hidden,
}) => {
  return (
    <input
      className='w-full border border-neutral-300 focus:outline-2 focus:outline-blue-500 rounded p-4'
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      type={hidden ? 'password' : 'text'}
    />
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

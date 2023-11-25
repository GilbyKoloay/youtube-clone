import {
  Home,
  Shorts,
  Subscriptions,
  Gallery,
  History
} from '../../assets/svg';



const Button = ({ imgSrc, children }) => {
  return (
    <button className='w-full py-4 rounded-lg flex flex-col items-center gap-1 hover:bg-neutral-800'>
      <img src={imgSrc} alt='item-img' />
      <span style={{fontSize: 10}}>{children}</span>
    </button>
  );
};



const NavMinimized = () => {
  return (
    <nav className='p-1 overflow-auto'>
      <Button imgSrc={Home}>Home</Button>
      <Button imgSrc={Shorts}>Shorts</Button>
      <Button imgSrc={Subscriptions}>Subscriptions</Button>
      <Button imgSrc={Gallery}>You</Button>
      <Button imgSrc={History}>History</Button>
    </nav>
  );
};



export default NavMinimized;

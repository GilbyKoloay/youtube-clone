import Header from './Header';
import Nav from './Nav';
import Main from './Main';



const Home = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <div className='flex-1 flex'>
        <Nav />
        <Main />
      </div>
    </div>
  );
};



export default Home;

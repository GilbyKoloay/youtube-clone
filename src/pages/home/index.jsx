import { useState } from 'react';

import { Header, NavMaximized, NavMinimized } from '../../components';
import Main from './Main';



const Home = () => {
  const [navbarSize, setNavbarSize] = useState('maximized');



  function changeNavbarSize() {
    if (navbarSize === 'maximized') setNavbarSize('minimized');
    else setNavbarSize('maximized');
  }



  return (
    <div className='h-screen flex flex-col'>
      <Header burgerOnClick={changeNavbarSize} />
      <div className='flex-1 flex overflow-auto'>
        {(navbarSize === 'maximized') && <NavMaximized />}
        {(navbarSize === 'minimized') && <NavMinimized />}
        <Main />
      </div>
    </div>
  );
};



export default Home;

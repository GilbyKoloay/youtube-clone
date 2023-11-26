import { useState } from 'react';

import { Header, NavMaximized, NavMinimized } from '../../components';
import CategoryList from './CategoryList';
import VideoList from './VideoList';



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
        
        <main className='pt-3 pb-8 pl-8 flex-1 overflow-auto flex flex-col'>
          <CategoryList />
          <VideoList />
        </main>
      </div>
    </div>
  );
};



export default Home;

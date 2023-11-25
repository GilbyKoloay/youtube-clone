import { useState } from 'react';

import {
  Burger,
  YouTube,
  Search,
  Cross,
  Microphone,
  Dots
} from '../../assets/svg';
import { SignInButton } from '../../components';



const Header = ({ changeNavbarSize }) => {
  const [isSearchQueryFocused, setIsSearchQueryFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');



  return (
    <header className='py-2 pl-4 pr-8 flex justify-between gap-48'>
      <div className='flex gap-4'>
        <button className='p-2 rounded-full hover:bg-neutral-800'>
          <img
            src={Burger}
            alt='nav'
            onClick={changeNavbarSize}
          />
        </button>

        <img
          className='h-5 my-auto hover:cursor-pointer'
          src={YouTube}
          alt='youtube'
          onClick={() => window.location.reload()}
        />
      </div>



      <div className='flex-1 flex justify-center'>
        <div className={`w-full h-full border ${isSearchQueryFocused ? 'border-blue-800' : 'border-neutral-800'} rounded-l-full pl-4 pr-2 flex justify-between items-center`}>
          <img
            className={`${!isSearchQueryFocused ? 'hidden' : ''} h-1/2 mr-2`}
            src={Search}
            alt='search'
          />

          <input
            className='flex-1 outline-none bg-transparent'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder='Search'
            onFocus={() => setIsSearchQueryFocused(true)}
            onBlur={() => setIsSearchQueryFocused(false)}
          />

          {searchQuery && (
            <button className='rounded-full hover:bg-neutral-800' onClick={() => setSearchQuery('')}>
              <img
                className='h-4/5'
                src={Cross}
                alt='clear'
              />
            </button>
          )}
        </div>

        <button className='bg-neutral-800 h-full py-2 px-6 rounded-r-full' title='Search'>
          <img src={Search} alt='search' />
        </button>

        <button className='ml-4 bg-neutral-800 p-2 rounded-full hover:bg-neutral-700' title='Search with your voice'>
          <img src={Microphone} alt='microphone' />
        </button>
      </div>



      <div className='flex gap-2 items-center'>
        <button className='p-2 rounded-full hover:bg-neutral-800' title='Settings'>
          <img src={Dots} alt='settings' />
        </button>

        <SignInButton />
      </div>
    </header>
  );
};



export default Header;

import { Routes as RNDRoutes, Route } from 'react-router-dom';

import { useAuthState } from './hooks';
import {
  Home,
  Video,
  SignIn,
  SignUp,
  NotFound
} from './pages';



const Routes = () => {
  const auth = useAuthState();



  return (
    <RNDRoutes>
      <Route path='/' element={<Home />} />
      <Route path='/:id' element={<Video />} />
      {!auth && (
        <>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </>
      )}
      <Route path='/not-found' element={<NotFound />} />
    </RNDRoutes>
  );
};



export default Routes;

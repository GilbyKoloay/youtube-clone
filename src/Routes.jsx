import { Routes as RNDRoutes, Route, Navigate } from 'react-router-dom';

import {
  Home,
  Video,
  SignIn,
  SignUp
} from './pages';



const Routes = () => {
  return (
    <RNDRoutes>
      <Route path='/' element={<Home />} />
      <Route path='/:id' element={<Video />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      
      <Route path='*' element={<Navigate to='/' />} />
    </RNDRoutes>
  );
};



export default Routes;

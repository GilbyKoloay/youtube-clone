import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { getUser } from '../firebase';



const useAppState = () => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);



  useEffect(() => {
    const thisAuth = getAuth();
    const unsubscribe = onAuthStateChanged(thisAuth, value => setAuth(value));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (auth) getUser(auth.uid, setUser);
    else setUser(null);
  }, [auth]);



  return {auth, user};
};



export default useAppState;

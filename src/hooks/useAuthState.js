import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';



const useAuthState = () => {
  const [user, setUser] = useState(null);



  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, thisUser => setUser(thisUser))
    
    return () => unsubscribe();
  }, []);



  return user;
};



export default useAuthState;

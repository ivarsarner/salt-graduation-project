import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [loggedinUser, setLoggedinUser] = useState('');
  const [firebaseError, setFirebaseError] = useState('');

  const checkAuthState = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Auth state changed -> Logged in!');
        const { uid, displayName } = user;
        setLoggedinUser({ uid, displayName });
        localStorage.user = JSON.stringify({ uid, displayName });
      } else {
        console.log('Auth state changed -> Logged out!');
        setLoggedinUser('');
        localStorage.user = false;
      }
    });
  };

  useEffect(() => {
    const data = localStorage.user;
    if (data) {
      console.log('im logged in');
      setLoggedinUser(JSON.parse(localStorage.user));
      checkAuthState();
    } else {
      console.log(localStorage.user, 'FALSE I not logged in');
      checkAuthState();
    }
  }, []);

  const logIn = async (username, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(username, password);
    } catch (error) {
      setFirebaseError({
        errorCode: error.code,
        errorMessage: error.message,
      });
    }
  };

  const logOut = async () => {
    try {
      await firebase.auth().signOut();
      checkAuthState();
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        loggedinUser,
        loggedinUserActions: { logIn, logOut },
        firebaseError,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

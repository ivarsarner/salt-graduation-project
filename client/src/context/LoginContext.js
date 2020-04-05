import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [loggedinUser, setLoggedinUser] = useState('');
  const [firebaseError, setFirebaseError] = useState('');

  const checkAuthState = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName } = user;
        setLoggedinUser({ uid, displayName });
        localStorage.user = JSON.stringify({ uid, displayName });
      } else {
        setLoggedinUser('');
        localStorage.user = false;
      }
    });
  };

  useEffect(() => {
    const data = localStorage.user;
    if (data) {
      setLoggedinUser(JSON.parse(localStorage.user));
      checkAuthState();
    } else {
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

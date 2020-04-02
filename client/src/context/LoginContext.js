import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [loggedinUser, setLoggedinUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Auth state changed -> Logged in!');
        setLoggedinUser(user);
      } else {
        console.log('Auth state changed -> Logged out!');
        setLoggedinUser({});
      }
    });
  }, []);

  /*   const getCurrentUser = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      console.log(user);
    } else {
      console.log('not signed in');
    }
  };

  getCurrentUser(); */

  const logIn = async (username, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(username, password);
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  };

  const logOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  };

  return (
    <LoginContext.Provider
      value={{ loggedinUser, loggedinUserActions: { logIn, logOut } }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

import React, { createContext, useState } from 'react';
import firebase from '../firebase';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [loggedinUser, setLoggedinUser] = useState({});

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      console.log('Auth state changed -> Logged in!');
      //if (!loggedinUser) setLoggedinUser(user);
    } else {
      console.log('Auth state changed -> Logged out!');
      //if (loggedinUser) setLoggedinUser({});
    }
  });

  const getCurrentUser = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      console.log(user);
    } else {
      console.log('not signed in');
    }
  };

  getCurrentUser();

  const logIn = async (username, password) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(username, password);
      setLoggedinUser(user);
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

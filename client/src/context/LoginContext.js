import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
import Login from '../components/Login';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [loggedinUser, setLoggedinUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Auth state changed -> Logged in!');
        setLoggedinUser(user);
      } else {
        console.log('Auth state changed -> Logged out!');
        setLoggedinUser('');
      }
    });
  }, []);

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
      {loggedinUser ? props.children : <Login />}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

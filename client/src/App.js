import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CheckoutContextProvider from './context/CheckoutContext';
import Navigation from './components/Navigation';
import CheckoutContainer from './components/CheckoutContainer';
import Login from './components/Login';
import './App.scss';
import LoginContextProvider from './context/LoginContext';
import firebase from './firebase';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('APP >>>> Auth state changed -> Logged in!');
        setLoggedIn(true);
      } else {
        console.log('APP >>>> Auth state changed -> Logged out!');
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <LoginContextProvider>
        <CheckoutContextProvider>
          <Navigation />
          <Switch>
            <Route exact path="/">
              {loggedIn ? <CheckoutContainer /> : <Login />}
            </Route>
            <Route path="/login" component={Login} />
          </Switch>
        </CheckoutContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

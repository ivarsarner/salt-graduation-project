import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CheckoutContextProvider from './context/CheckoutContext';
import Navigation from './components/Navigation';
import CheckoutContainer from './components/CheckoutContainer';
import Login from './components/Login';
import './App.scss';
import LoginContextProvider from './context/LoginContext';
import firebase from './firebase';

export default function App() {
  let loggedIn;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('Logged in!');
      loggedIn = true;
    } else {
      console.log('Logged out!');
      loggedIn = false;
    }
  });

  return (
    <BrowserRouter>
      <LoginContextProvider>
        <CheckoutContextProvider>
          <Navigation />
          <Switch>
            <Route exact path="/" component={CheckoutContainer} />
            <Route path="/login" component={Login} />
          </Switch>
        </CheckoutContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

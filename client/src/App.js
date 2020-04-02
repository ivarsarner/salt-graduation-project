import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CheckoutContextProvider from './context/CheckoutContext';
import Navigation from './components/Navigation';
import CheckoutContainer from './components/CheckoutContainer';
import Login from './components/Login';
import './App.scss';
import LoginContextProvider from './context/LoginContext';

export default function App() {
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

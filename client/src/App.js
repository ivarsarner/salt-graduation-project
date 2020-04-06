import React, { useContext } from 'react';
import CheckoutContextProvider from './context/CheckoutContext';
import CheckoutContainer from './components/CheckoutContainer';
import Login from './components/Login';
import Navigation from './components/Navigation';
import { LoginContext } from './context/LoginContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.scss';

export default function App() {
  const { loggedinUser } = useContext(LoginContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {loggedinUser ? (
            <CheckoutContextProvider>
              <Navigation />
              <CheckoutContainer />
            </CheckoutContextProvider>
          ) : (
            <Login />
          )}
        </Route>
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

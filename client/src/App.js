import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CheckoutContextProvider from './context/CheckoutContext';
import Navigation from './components/Navigation';
import CheckoutContainer from './components/CheckoutContainer';
import Login from './components/Login';
import './App.scss';
import { LoginContext } from './context/LoginContext';

export default function App() {
  const { loggedinUser } = useContext(LoginContext);
  console.log(loggedinUser);
  return (
    <BrowserRouter>
      <CheckoutContextProvider>
        <Navigation />
        <Switch>
          <Route exact path="/">
            {loggedinUser ? <CheckoutContainer /> : <Login />}
          </Route>
          <Route path="/login" component={Login} />
        </Switch>
      </CheckoutContextProvider>
    </BrowserRouter>
  );
}

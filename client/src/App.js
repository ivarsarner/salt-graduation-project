import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CheckoutContextProvider from './context/CheckoutContext';
import CustomerContextProvider from './context/CustomerContext';
import Navigation from './components/Navigation';
import CheckoutContainer from './components/CheckoutContainer';
import Other from './components/Other';

import './App.scss';

export default function App() {
  return (
    <BrowserRouter>
      <CheckoutContextProvider>
        <CustomerContextProvider>
          <Navigation />
          <Switch>
            <Route exact path="/" component={CheckoutContainer} />
            <Route path="/other" component={Other} />
          </Switch>
        </CustomerContextProvider>
      </CheckoutContextProvider>
    </BrowserRouter>
  );
}

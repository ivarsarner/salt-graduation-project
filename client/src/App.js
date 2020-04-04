import React, { useContext, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CheckoutContextProvider from './context/CheckoutContext';
// import CheckoutContainer from './components/CheckoutContainer';
import Login from './components/Login';
import Loading from './components/Loading';
import './App.scss';
import { LoginContext } from './context/LoginContext';
import Navigation from './components/Navigation';

const CheckoutContainer = lazy(() => import('./components/CheckoutContainer'));

export default function App() {
  const { loggedinUser } = useContext(LoginContext);
  return (
    <BrowserRouter>
      <CheckoutContextProvider>
        <Navigation />
        <Switch>
          <Route exact path="/">
            {loggedinUser ? (
              <Suspense fallback={<Loading />}>
                <CheckoutContainer />
              </Suspense>
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/login" component={Login} />
        </Switch>
      </CheckoutContextProvider>
    </BrowserRouter>
  );
}

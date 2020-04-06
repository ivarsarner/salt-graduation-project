/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from 'react';
import {
  getRandomCustomer,
  postNewCheckoutToFirebase,
} from './mockHelperFunctions';
import apiEndpoint from '../config';
import firebase from '../firebase';
import axios from 'axios';
import reducer from '../reducer';
import { LoginContext } from './LoginContext';

import newMockData from '../assets/new-checkouts-mock-data.json';

export const CheckoutContext = createContext();

const CheckoutContextProvider = ({ children }) => {
  const { loggedinUser } = useContext(LoginContext);

  const initialState = {
    checkouts: [],
    customers: [],
    currentStore: '',
    showOrderDetails: false,
    currentOrderDetails: {},
    customerSyncComplete: false,
    checkoutSyncComplete: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [newCheckoutData, setNewCheckoutData] = useState([]); // move to reducer

  useEffect(() => {
    async function fetchCustomers() {
      const { data } = await axios.get(`${apiEndpoint}/api/customers`);
      dispatch({ type: 'SET_CUSTOMERS', data });
    }
    fetchCustomers();
    return () => dispatch({ type: 'LOAD_FIREBASE', data: [] });
  }, []);

  useEffect(() => {
    if (state.customerSyncComplete && loggedinUser) {
      let database = firebase.database().ref('/');
      database
        .orderByChild('merchant')
        .equalTo(loggedinUser.displayName)
        .limitToLast(20)
        .on('value', (snapshot) => {
          const firebaseData = snapshot.val();
          storeFirebaseData(Object.values(firebaseData));
        });
      setNewCheckoutData(newMockData);
    }
  }, [state.customerSyncComplete, loggedinUser]);

  const storeFirebaseData = async (firebaseData) => {
    const dataWithCheckoutId = firebaseData.map((checkout) => {
      if (!checkout.customer) {
        const customer = getRandomCustomer(state.customers);
        return {
          ...checkout,
          checkoutId: Math.floor(Math.random() * 4) + 1,
          customer: {
            imageUrl: customer.picture,
            name: customer.name,
          },
        };
      }
      return checkout;
    });
    dispatch({ type: 'LOAD_FIREBASE', data: dataWithCheckoutId });
  };

  useEffect(() => filterCurrentStore(), [state.checkouts]);

  const filterCurrentStore = () => {
    const data = state.checkouts.find(
      (item) => item.merchant === loggedinUser.displayName
    );
    if (data) {
      dispatch({
        type: 'SET_STORE_NAME',
        data: data.merchantName,
      });
    }
  };

  const addNewCheckout = () =>
    postNewCheckoutToFirebase(newCheckoutData, state, loggedinUser);

  const showOrderDetailsView = (queryId) => {
    const orderData = state.checkouts.find((item) => item.id === queryId);
    dispatch({ type: 'TOGGLE_ORDER_DETAILS', data: orderData });
  };

  return (
    <CheckoutContext.Provider
      value={{
        state,
        dispatch,
        checkoutsActions: { addNewCheckout, showOrderDetailsView },
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;

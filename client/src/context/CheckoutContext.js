/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from 'react';
import newMockData from '../assets/new-checkouts-mock-data.json';
import moment from 'moment';
import firebase from '../firebase';
import axios from 'axios';

export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
  const [checkouts, setCheckouts] = useState([]);
  const [newCheckoutData, setNewCheckoutData] = useState([]);
  const [checkoutSyncComplete, setCheckoutSyncComplete] = useState(false);
  const [currentStore, setCurrentStore] = useState('');
  const [customers, setCustomers] = useState([]);
  const [customerSyncComplete, setCustomerSyncComplete] = useState(false);

  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  const addCheckoutId = async (firebaseData) => {
    const dataWithCheckoutId = firebaseData.map((checkout) => {
      if (!checkout.customer) {
        const customer = getRandomCustomer();
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
    setCheckouts(dataWithCheckoutId);
    setCheckoutSyncComplete(true);
  };

  const getRandomCustomer = () => customers[Math.floor(Math.random() * 99)];

  const filterCurrentStore = () =>
    setCurrentStore(checkouts[0] && checkouts[0].merchantName);

  const addNewCheckout = () => {
    let newCheckout = newCheckoutData.splice(-1, 1);
    const customer = getRandomCustomer();

    newCheckout = {
      ...newCheckout[0],
      timeCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
      checkoutId: Math.floor(Math.random() * 4) + 1,
      id: Math.floor(Math.random() * 999999999),
      customer: {
        imageUrl: customer.picture,
        name: customer.name,
      },
    };
    firebase
      .database()
      .ref('/')
      .push(newCheckout);
  };

  useEffect(() => {
    async function fetchCustomers() {
      const { data } = await axios.get('/api/customers');
      setCustomers(data);
      setCustomerSyncComplete(true);
    }
    fetchCustomers();
  }, []);

  const showMoreDetails = (queryId) => {
    const orderData = checkouts.find((item) => item.id === queryId);
    setShowOrderDetails(!showOrderDetails);
    setOrderDetails(orderData);
  };

  const hideOrderDetails = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  useEffect(() => {
    if (customerSyncComplete) {
      let database = firebase.database().ref('/');
      database
        .orderByChild('merchant')
        .equalTo('IfO0fugaM9XRaaICJ7LQ')
        .limitToLast(20)
        .on('value', (snapshot) => {
          const firebaseData = snapshot.val();
          addCheckoutId(Object.values(firebaseData));
        });
      setNewCheckoutData(newMockData);
    }
  }, [customerSyncComplete]);
  // eslint-disable-next-line
  useEffect(() => filterCurrentStore(), [checkoutSyncComplete]);

  return (
    <CheckoutContext.Provider
      value={{
        checkouts,
        currentStore,
        checkoutsActions: { addNewCheckout, showMoreDetails },
        orderDetails: { showOrderDetails, orderDetails, hideOrderDetails },
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;

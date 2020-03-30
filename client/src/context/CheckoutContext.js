import React, { createContext, useState, useEffect } from 'react';
import newMockData from '../assets/new-checkouts-mock-data.json';
import moment from 'moment';
import firebase from '../firebase';

export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
  const [checkouts, setCheckouts] = useState([]);
  const [newCheckoutData, setNewCheckoutData] = useState([]);
  const [checkoutSyncComplete, setCheckoutSyncComplete] = useState(false);
  const [currentStore, setCurrentStore] = useState('');

  const filterOrders = (firebaseData) => {
    const filterData = firebaseData
      .filter((checkout) => checkout.merchant === 'IfO0fugaM9XRaaICJ7LQ')
      .map((checkout) => ({
        ...checkout,
        checkout: Math.floor(Math.random() * 4) + 1,
      }));
    setCheckouts(filterData);
    setCheckoutSyncComplete(true);
  };

  const filterCurrentStore = () =>
    setCurrentStore(checkouts[0] && checkouts[0].merchantName);

  const addNewCheckout = () => {
    let newCheckout = newCheckoutData.splice(-1, 1);
    newCheckout = {
      ...newCheckout[0],
      timeCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
      checkout: Math.floor(Math.random() * 4) + 1,
      id: Math.floor(Math.random() * 999999999),
    };
    firebase
      .database()
      .ref('/')
      .push(newCheckout);
  };

  useEffect(() => {
    let database = firebase.database().ref('/');
    database.on('value', (snapshot) => {
      const firebaseData = snapshot.val();
      filterOrders(Object.values(firebaseData));
    });

    setNewCheckoutData(newMockData);
  }, []);
  // eslint-disable-next-line
  useEffect(() => filterCurrentStore(), [checkoutSyncComplete]);

  return (
    <CheckoutContext.Provider
      value={{ checkouts, currentStore, checkoutsActions: { addNewCheckout } }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;

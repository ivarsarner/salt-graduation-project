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
    console.log('this is the firebase data', firebaseData[63]);
    console.log('this is the firebase data', firebaseData[5]);
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

  const getFirebaseData = () => {
    let database = firebase.database().ref('/');
    database.on('value', (snapshot) => {
      const firebaseData = snapshot.val();
      filterOrders(firebaseData);
    });
    console.log('DATA RETRIEVED');
  };

  const addNewCheckout = () => {
    let newCheckout = newCheckoutData.splice(-1, 1);
    newCheckout = {
      ...newCheckout[0],
      timeCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
      checkout: Math.floor(Math.random() * 4) + 1,
    };
    firebase
      .database()
      .ref('/')
      .push(newCheckout);
  };

  useEffect(() => {
    getFirebaseData();
    setNewCheckoutData(newMockData);
  }, []);
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

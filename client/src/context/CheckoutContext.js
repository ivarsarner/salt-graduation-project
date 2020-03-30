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

  const addCheckoutId = (firebaseData) => {
    const dataWithCheckoutId = firebaseData.map((checkout) => ({
      ...checkout,
      checkoutId: Math.floor(Math.random() * 4) + 1,
    }));
    setCheckouts(dataWithCheckoutId);
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
    database
      .orderByChild('merchant')
      .equalTo('IfO0fugaM9XRaaICJ7LQ')
      .on('value', (snapshot) => {
        const firebaseData = snapshot.val();
        console.log(firebaseData);
        addCheckoutId(Object.values(firebaseData));
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

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

  const addCheckoutId = async (firebaseData) => {
    console.log('but customers exist', customers);
    const dataWithCheckoutId = Promise.all(
      firebaseData.map(async (checkout) => {
        const customer = await getRandomCustomer();
        console.log('im a customer', customer);
        return {
          ...checkout,
          checkoutId: Math.floor(Math.random() * 4) + 1,
          customer: {
            imageUrl: customer && customer.picture,
          },
        };
      })
    );

    console.log('hello, is we alive?', dataWithCheckoutId);
    setCheckouts(dataWithCheckoutId);
    setCheckoutSyncComplete(true);
  };

  const fetchCustomers = async () => {
    const { data } = await axios.get('/api/customers');
    setCustomers(data);
  };

  const getRandomCustomer = () => customers[Math.floor(Math.random() * 99)];

  // const getRandomCustomer = (data) =>
  //   data[Math.floor(Math.random() * 99)].picture;

  // const getCustomers = async () => {
  //   const { data } = await axios.get('/api/customers');
  //   return data;
  // };

  const filterCurrentStore = () =>
    setCurrentStore(checkouts[0] && checkouts[0].merchantName);

  const addNewCheckout = () => {
    let newCheckout = newCheckoutData.splice(-1, 1);
    newCheckout = {
      ...newCheckout[0],
      timeCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
      checkoutId: Math.floor(Math.random() * 4) + 1,
      id: Math.floor(Math.random() * 999999999),
      // customer: {
      //   imageUrl: getCustomer(),
      // },
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
        fetchCustomers();
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

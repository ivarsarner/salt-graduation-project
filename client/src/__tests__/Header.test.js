import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/checkout/Header';
import CustomerName from '../components/checkout/Header';
import Image from '../components/checkout/Header';
import CheckoutContextProvider from '../context/CheckoutContext';

import testData from '../assets/order-mock-data.json';

const fakeCustomer = {
  customer: {
    imageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'Francis Russell',
  },
};

it('<Header /> renders without crashing', () => {
  const component = shallow(<Header checkout={testData} />);
  expect(component.exists('.data')).toBe(true);
});

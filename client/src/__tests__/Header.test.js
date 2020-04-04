import React from 'react';
import { mount } from 'enzyme';
import Header from '../components/checkout/Header';

const testData = {
  checkoutId: 2,
  customer: {
    imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Luis Douglas',
  },
  id: 733666501,
  items: [
    {
      gtin: '40099330',
      price: '10.9',
      product: '{brand: "Hubba Bubba", name: "Apple", quantity: "5b…}',
      productPrice: '10.9',
      quantity: 1,
    },
  ],
  merchant: 'IfO0fugaM9XRaaICJ7LQ',
  merchantName: 'ICA Supermarket Sabbatsberg',
  price: 10.9,
  status: 'refunded',
  timeCreated: '2020-04-04T17:32:31',
  user: 'TzgM85JXsbPcUXbJruY70Q4aa773',
};

const testData2 = {
  checkoutId: 2,
  id: 733666501,
  items: [
    {
      gtin: '40099330',
      price: '10.9',
      product: '{brand: "Hubba Bubba", name: "Apple", quantity: "5b…}',
      productPrice: '10.9',
      quantity: 1,
    },
  ],
  merchant: 'IfO0fugaM9XRaaICJ7LQ',
  merchantName: 'ICA Supermarket Sabbatsberg',
  price: 10.9,
  status: 'refunded',
  timeCreated: '2020-04-04T17:32:31',
  user: 'TzgM85JXsbPcUXbJruY70Q4aa773',
};

describe('The <Header /> component', () => {
  it('WITH DATA renders as expected', () => {
    const component = mount(<Header checkout={testData} />);
    expect(component.find('img').text().length).toBeGreaterThanOrEqual(0);
    expect(component.find('h4').text().length).toBeGreaterThanOrEqual(0);
    expect(component.find('h4').text()).toMatch(/\b\w*\s\w*/gm);
  });
  it.skip('WITH NO DATA renders as expected', () => {
    const component = mount(<Header checkout={testData2} />);
    console.log(component.debug());
    // expect(component.find('.checkout-number')).toMatch(/\d*/);
    // expect(component.find('h4').text().length).toBeGreaterThanOrEqual(0);
    // expect(component.find('h4').text()).toMatch(/\b\w*\s\w*/gm);
  });
});

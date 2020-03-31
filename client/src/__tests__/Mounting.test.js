import React from 'react';
import { mount } from 'enzyme';
import CheckoutContainer from '../components/CheckoutContainer';
import CheckoutContextProvider from '../context/CheckoutContext';

it.skip('<CheckoutContainer /> renders without crashing', () => {
  const component = mount(
    <CheckoutContextProvider>
      <CheckoutContainer />
    </CheckoutContextProvider>
  );
  console.log(component.debug());

  expect(component.html()).toMatch(/<img .*\/>/i);
});

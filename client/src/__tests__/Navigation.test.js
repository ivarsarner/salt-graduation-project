import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../components/Navigation';

import CheckoutContextProvider from '../context/CheckoutContext';

it('<Navigation /> renders without crashing', () => {
  const component = shallow(
    <CheckoutContextProvider>
      <Navigation />
    </CheckoutContextProvider>
  );
  expect(component.html()).toMatch(/<img .*\/>/i);
});

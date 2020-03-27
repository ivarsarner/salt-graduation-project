import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  const { getByAltText } = render(<App />);
  const wayLogo = getByAltText(/way/i);
  expect(wayLogo).toBeInTheDocument();
});

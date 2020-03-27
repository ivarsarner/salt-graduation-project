import React from 'react';
import { render } from '@testing-library/react';
import Navigation from '../components/Navigation';

test('renders learn react link', () => {
  const { getByAltText } = render(<Navigation />);
  const wayLogo = getByAltText(/way/i);
  expect(wayLogo).toBeInTheDocument();
});

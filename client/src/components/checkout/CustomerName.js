import React from 'react';
import styled from 'styled-components';

const Headline = styled.h4`
  margin: 0;
`;

export default function CustomerName({ customerData }) {
  if (customerData !== undefined) {
    return (
      <Headline>{customerData.customer && customerData.customer.name}</Headline>
    );
  } else {
    return null;
  }
}

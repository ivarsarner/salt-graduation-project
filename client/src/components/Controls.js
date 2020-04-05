import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ControlsDiv = styled.div`
  display: none;
  @media (max-width: 625px) {
    display: flex;
    margin: 10px auto;
    button:first-child {
      margin-right: 10px;
    }
  }
`;

function Controls({ setMobileView }) {
  return (
    <ControlsDiv>
      <Button onClick={() => setMobileView(false)}>Checkouts</Button>
      <Button onClick={() => setMobileView(true)}>History</Button>
    </ControlsDiv>
  );
}

export default React.memo(Controls);

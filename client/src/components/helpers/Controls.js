import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ControlsDiv = styled.div`
  display: none;
  @media (max-width: 625px) {
    display: flex;
    margin: 10px auto;
    button {
      margin-right: 10px;
      color: #202129;
      background-color: #ffffff;
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      text-align: center;
      margin: 5px;
      font-size: 0.7rem;

      &:hover {
        color: #202129;
        background-color: #e1e2e2;
        opacity: 1;
      }

      &:active {
        background-color: #d5d6d6;
        opacity: 1;
      }
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

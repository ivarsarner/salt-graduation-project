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

export default function Controls({ setMobileView }) {
  return (
    <>
      <ControlsDiv>
        <Button clickAction={() => setMobileView(false)} text="Checkouts" />
        <Button clickAction={() => setMobileView(true)} text="History" />
      </ControlsDiv>
    </>
  );
}

import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  /* display: flex; */
  overflow: hidden;
  margin: 10px;
  padding: 12px 12px;
  cursor: pointer;
  user-select: none;
  transition: all 150ms linear;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
  text-transform: capitalize;
  color: ${(props) => (props.isDark ? '#ffffff' : '#202129')};
  background-color: ${(props) => (props.isDark ? '#161616' : '#f2f2f2')};
  border: 0 none;
  border-radius: 36px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  appearance: none;
  justify-content: center;
  align-items: center;
  width: 100px;
  box-shadow: 2px 5px 10px #f5f5f5;
  &:hover {
    transition: all 150ms linear;
    opacity: 0.85;
  }
  &:active {
    transition: all 150ms linear;
    opacity: 0.75;
  }
  &:focus {
    outline: none;
  }
`;

function Button({ children, onClick }) {
  return (
    <Btn type="button" isDark onClick={() => onClick()}>
      {children}
    </Btn>
  );
}

export default React.memo(Button);

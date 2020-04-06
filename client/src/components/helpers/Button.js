import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  overflow: hidden;
  margin: ${(props) => (props.alignCenter ? '0 auto' : '10px')};
  padding: 12px 12px;
  cursor: pointer;
  user-select: none;
  transition: all 150ms linear;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
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
  box-shadow: 2px 5px 10px #f5f5f5;
  width: 70px;
  height: 30px;
  margin: 5px;
  padding: 0px;

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

function Button({ children, onClick, type = 'button' }) {
  return (
    <Btn
      isDark
      type={type}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </Btn>
  );
}

export default React.memo(Button);

import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import styled from 'styled-components';
import Button from './helpers/Button';

import logo from '../assets/logo-black.svg';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  text-align: center;
`;

const InputEmail = styled.input`
  text-align: center;
  border-radius: 5px;
  padding: 0.2rem 1rem;
  margin: 0.6rem 0rem;
  border: ${(props) => (props.error ? 'red' : 'grey')} SOLID 1px;
`;

const InputPassword = styled.input`
  text-align: center;
  border-radius: 5px;
  padding: 0.2rem 1rem;
  margin: 0.6rem 0rem;
  border: ${(props) => (props.error ? 'red' : 'grey')} SOLID 1px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loggedinUserActions } = useContext(LoginContext);
  const { firebaseError } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loggedinUserActions.logIn(email, password);
  };

  return (
    <LoginContainer>
      <div>
        <img src={logo} alt="Way" width={200} />
        <h4>Login to your store</h4>
      </div>
      <Form onSubmit={handleSubmit}>
        <InputEmail
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={firebaseError.type === 'email' ? true : false}
        />
        <InputPassword
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={firebaseError.type === 'password' ? true : false}
        />
        <Button type="submit">Log in</Button>
        <ErrorMessage>
          {firebaseError ? firebaseError.errorMessage : ''}
        </ErrorMessage>
        <div>
          <br></br>ica.sabbatsberg@ica.se <br></br>saltway
        </div>
      </Form>
    </LoginContainer>
  );
}

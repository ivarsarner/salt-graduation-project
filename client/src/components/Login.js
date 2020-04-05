import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import styled from 'styled-components';
import logo from '../assets/logo-black.svg';
import Button from '../components/Button';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
  text-align: center;
`;

const Form = styled.form`
  width: 200px;
  text-align: center;
`;

const Input = styled.input`
  text-align: center;
  border: grey SOLID 1px;
  border-radius: 5px;
  padding: 0.2rem 1rem;
  margin: 0.6rem 0rem;
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loggedinUserActions } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateUsername()) {
      await loggedinUserActions.logIn(username, password);
    } else {
      console.log('wrong email');
    }
  };

  const validateUsername = () => {
    const emailRegex = /^[\w._-]+@(\w[\w_-]+)+\.[a-z]{2,3}$/i;
    return emailRegex.test(username);
  };

  return (
    <LoginContainer>
      <div>
        <img src={logo} alt="Way" width={200} />
        <br></br>ica.sabbatsberg@ica.se <br></br>saltway
      </div>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Button onClick={handleSubmit}>Login</Button> */}
        <Input type="submit" value="Login" />
      </Form>
    </LoginContainer>
  );
}

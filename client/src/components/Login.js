import React, { useState, useContext, useEffect } from 'react';
import { LoginContext } from '../context/LoginContext';
import styled from 'styled-components';
import logo from '../assets/logo-black.svg';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
  text-align: center;
`;

const Form = styled.form`
  width: 300px;
  text-align: center;
`;

const Input = styled.input`
  text-align: center;
  border: grey SOLID 1px;
  border-radius: 5px;
  padding: 0.2rem 1rem;
  margin: 0.3rem 0rem;
  font-size: 1rem;
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorStyle, setErrorStyle] = useState('');

  const { loggedinUserActions } = useContext(LoginContext);
  const { firebaseError } = useContext(LoginContext);

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

  useEffect(() => {
    console.log(Form);
    if (firebaseError) {
      console.log(firebaseError);
      switch (firebaseError.errorCode) {
        case 'auth/invalid-email':
          console.log(firebaseError.errorMessage);
          break;
        case 'auth/user-disabled':
          console.log(firebaseError.errorMessage);
          break;
        case 'auth/user-not-found':
          console.log(firebaseError.errorMessage);
          break;
        case 'auth/wrong-password':
          console.log(firebaseError.errorMessage);
          break;

        default:
          console.error(firebaseError);
          console.error(firebaseError);
          break;
      }
    }
  }, [firebaseError]);

  return (
    <LoginContainer>
      <div>
        <img src={logo} alt="Way" width={100} />
        <br></br>ica.sabbatsberg@ica.se <br></br>saltway
      </div>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
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
        <Input type="submit" value="Login" />
      </Form>
      {firebaseError ? (
        <div>{firebaseError.errorMessage}</div>
      ) : (
        <div>no errors</div>
      )}
    </LoginContainer>
  );
}

import React, { useState, useContext /* useEffect */ } from 'react';
import { LoginContext } from '../context/LoginContext';
import styled from 'styled-components';
import logo from '../assets/logo-black.svg';
import Loading from './Loading';
import Button from '../components/Button';

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

/* const InputButton = styled.input`
  width: 50%;
  text-align: center;
  border-radius: 5px;
  padding: 0.2rem 1rem;
  margin: 0.6rem 0rem;
  border: grey SOLID 1px;
  &:hover {
    background-color: #ababab;
  }
`; */

const ErrorMessage = styled.div`
  color: red;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState('');

  /*   const [errorType, setErrorType] = useState({
    email: false,
    password: false,
  }); */

  const { loggedinUserActions } = useContext(LoginContext);
  const { firebaseError } = useContext(LoginContext);

  const handleSubmit = async () => {
    setLoading(true);
    await loggedinUserActions.logIn(email, password);
  };

  /*   const validateEmail = () => {
    const emailRegex = /^[\w._-]+@(\w[\w_-]+)+\.[a-z]{2,3}$/i;
    return emailRegex.test(email);
  }; */

  /*   useEffect(() => {
    if (firebaseError) {
      console.log(firebaseError.type);
      switch (firebaseError.errorCode) {
        case 'auth/invalid-email':
          setErrorType({ email: true });
          break;
        case 'auth/user-disabled':
          setErrorType({ email: true });
          break;
        case 'auth/user-not-found':
          setErrorType({ email: true });
          break;
        case 'auth/wrong-password':
          setErrorType({ password: true });
          break;
        default:
          console.error(firebaseError.errorCode);
          console.error(firebaseError.errorMessage);
          break;
      }
    }
  }, [firebaseError]); */

  return loading ? (
    <Loading />
  ) : (
    <LoginContainer>
      <div>
        <img src={logo} alt="Way" width={200} />
        <h4>Login to your store</h4>
      </div>
      <Form>
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
        {/* <InputButton type="submit" value="Login" /> */}
        <Button onClick={handleSubmit}>Log in</Button>
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

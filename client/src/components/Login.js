import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loggedinUser, loggedinUserActions } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateUsername()) {
      await loggedinUserActions.logIn(username, password);
      setUsername('');
      setPassword('');
    } else {
      console.log('wrong email');
    }
  };

  const validateUsername = () => {
    const emailRegex = /^[\w._-]+@(\w[\w_-]+)+\.[a-z]{2,3}$/i;
    return emailRegex.test(username);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="user name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
      <button
        onClick={async () => {
          await loggedinUserActions.logOut();
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Login;

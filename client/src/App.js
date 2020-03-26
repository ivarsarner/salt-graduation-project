import React, { useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const testApi = async () => {
    const request = await axios.get('/api');
    console.log(request);
  };

  useEffect(() => {
    testApi();
  });

  return <div className="App">oh hey there</div>;
}

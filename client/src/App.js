import React, {useEffect} from 'react';
import Navigation from './components/Navigation';
import CheckoutContainer from './components/CheckoutContainer';
import axios from 'axios';

export default function App() {
	const testApi = async () => {
		const request = await axios.get('/api');
		console.log(request);
	};

	useEffect(() => {
		testApi();
	});

	return (
		<>
			<Navigation />
			<CheckoutContainer />
		</>
	);
}

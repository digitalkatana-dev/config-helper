import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Questionnaire from './pages/Questionnaire';
import ConfigReview from './pages/ConfigReview';
import './App.css';

function App() {
	const { theme } = useSelector((state) => state.app);

	return (
		<div className='App' data-theme={theme}>
			<Router>
				<Topbar />
				<Routes>
					<Route path='/' element={<Questionnaire />} />
					<Route path='/config-result' element={<ConfigReview />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

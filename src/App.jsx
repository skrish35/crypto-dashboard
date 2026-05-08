import { Routes, Route } from 'react-router';
import Header from './components/Header';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import CoinDetailsPage from './pages/coin-details';
import NotFoundPage from './pages/notfound';

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />}></Route>
				<Route path='/about' element={<AboutPage />}></Route>
				<Route path='/coin/:id' element={<CoinDetailsPage />}></Route>
				<Route path='*' element={<NotFoundPage />}></Route>
			</Routes>
		</>
	);
};

export default App;

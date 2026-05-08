import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import Spinner from '../components/Spinner';
import CoinChart from '../components/CoinChart';

const CoinDetailsPage = () => {
	const API_URL = import.meta.env.VITE_COIN_DETAILS_API_URL;
	const { id } = useParams();
	const [coinDetails, setCoinDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCoinDetails = async () => {
			try {
				const res = await fetch(`${API_URL}/${id}`);
				if (!res.ok) throw new Error('Failed to fetch coin details');
				const data = await res.json();
				setCoinDetails(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCoinDetails();
	}, [id]);

	return (
		<div className='coin-details-container'>
			<Link to='/'>Back to Home</Link>
			<h1 className='coin-details-title'>
				{coinDetails
					? `${coinDetails.name} (${coinDetails.symbol.toUpperCase()})`
					: 'Coin Details'}
			</h1>
			{loading && <Spinner />}
			{error && <div className='error'>{error}</div>}

			{!loading && !error && (
				<>
					<img
						src={coinDetails.image.large}
						alt={coinDetails.name}
						className='coin-details-image'
					/>
					<p>{coinDetails.description.en.split('. ')[0] + '.'}</p>

					<div className='coin-details-info'>
						<h3>Rank: #{coinDetails.market_cap_rank}</h3>
						<h4>
							Current Price: $
							{coinDetails.market_data.current_price.usd.toLocaleString()}
						</h4>
						<h4>
							Market Cap:{' '}
							{coinDetails.market_data.market_cap.usd.toLocaleString()}
						</h4>
						<h4>
							24h High: ${coinDetails.market_data.high_24h.usd.toLocaleString()}
						</h4>
						<h4>
							24h Low: ${coinDetails.market_data.low_24h.usd.toLocaleString()}
						</h4>
						<h4>
							24h Price Change: $
							{coinDetails.market_data.price_change_24h.toFixed(2)}
						</h4>
						<h4>
							Circulating Supply: $
							{coinDetails.market_data.circulating_supply.toLocaleString()}
						</h4>
						<h4>
							Total Supply: $
							{coinDetails.market_data.total_supply?.toLocaleString() || 'N/A'}
						</h4>
						<h4>
							Total Supply: $
							{coinDetails.market_data.total_supply?.toLocaleString() || 'N/A'}
						</h4>
						<h4>
							All-Time High: ${coinDetails.market_data.ath.usd.toLocaleString()}{' '}
							on{' '}
							{new Date(
								coinDetails.market_data.ath_date.usd
							).toLocaleDateString()}
						</h4>
						<h4>
							All-Time Low: ${coinDetails.market_data.atl.usd.toLocaleString()}{' '}
							on{' '}
							{new Date(
								coinDetails.market_data.atl_date.usd
							).toLocaleDateString()}
						</h4>
						<h4>
							Last Updated:{' '}
							{new Date(coinDetails.last_updated).toLocaleString()}
						</h4>
					</div>

					<CoinChart coinId={id} />

					<div className='coin-details-links'>
						{coinDetails.links.homepage[0] && (
							<p>
								<a
									href={coinDetails.links.homepage[0]}
									target='_blank'
									rel='noopener noreferrer'
								>
									Website
								</a>
							</p>
						)}
						{coinDetails.links.blockchain_site[0] && (
							<p>
								<a
									href={coinDetails.links.blockchain_site[0]}
									target='_blank'
									rel='noopener noreferrer'
								>
									Blockchain Explorer
								</a>
							</p>
						)}
						{coinDetails.categories.length > 0 && (
							<p>Categories: {coinDetails.categories.join(', ')}</p>
						)}

						{!loading && !error && !coinDetails && <h3>No Data Found...</h3>}
					</div>
				</>
			)}
		</div>
	);
};

export default CoinDetailsPage;

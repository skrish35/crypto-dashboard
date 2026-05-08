import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale
);

const CoinChart = ({ coinId }) => {
	const API_URL = import.meta.env.VITE_COIN_DETAILS_API_URL;
	const [chartData, setChartData] = useState({ labels: [], datasets: [] });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				const res = await fetch(
					`${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
				);
				if (!res.ok) throw new Error('Failed to fetch chart data');
				const data = await res.json();

				const prices = data.prices.map(([timestamp, price]) => ({
					x: timestamp,
					y: price,
				}));

				setChartData({
					labels: [],
					datasets: [
						{
							label: 'Price (USD)',
							data: prices,
							fill: false,
							borderColor: '#007bff',
							backgroundColor: 'rgba(0, 123, 255, 0.1)',
							pointRadisus: 0,
							tension: 0.3,
						},
					],
				});
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPrices();
	}, [coinId]);
	return (
		<div className='chart'>
			<Line
				data={chartData}
				options={{
					responsive: true,
					plugins: {
						legend: {
							display: false,
						},
						tooltip: {
							mode: 'index',
							intersect: false,
						},
					},
					scales: {
						x: {
							type: 'time',
							time: {
								unit: 'day',
								tooltipFormat: 'MMM d, yyyy',
							},
							ticks: {
								autoSkip: true,
								maxTicksLimit: 7,
							},
							title: {
								display: true,
								text: 'Date',
							},
						},
						y: {
							title: {
								display: true,
								text: 'Price (USD)',
							},
							ticks: {
								callback: (value) => `$${value.toLocaleString()}`,
							},
						},
					},
				}}
			></Line>
		</div>
	);
};

export default CoinChart;

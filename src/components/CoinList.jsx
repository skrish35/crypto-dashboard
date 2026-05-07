import CoinCard from './CoinCard';

const CoinList = ({ coins }) => {
	if (!coins || coins.length === 0) {
		return <h2>No coins found.</h2>;
	}

	return (
		<div>
			<main className='grid'>
				{coins.map((coin) => (
					<CoinCard key={coin.id} coin={coin} />
				))}
			</main>
		</div>
	);
};

export default CoinList;

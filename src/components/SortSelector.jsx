const SortSelector = ({ sortBy, onSortByChange }) => {
	return (
		<div className='controls'>
			<label htmlFor='sortBy'>Sort By</label>
			<select
				id='sort-by'
				value={sortBy}
				onChange={(e) => onSortByChange(e.target.value)}
			>
				<option value='market_cap_desc'>Market Cap (Desc)</option>
				<option value='market_cap_asc'>Market Cap (Asc)</option>
				<option value='price_desc'>Price (Desc)</option>
				<option value='price_asc'>Price (Asc)</option>
				<option value='change_desc'>Change (Desc)</option>
				<option value='change_asc'>Change (Asc)</option>
			</select>
		</div>
	);
};

export default SortSelector;

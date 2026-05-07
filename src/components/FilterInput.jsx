const FilterInput = ({ filter, onFilterChange }) => {
	return (
		<div className='filter'>
			<input
				type='text'
				name='filter'
				placeholder='Filter by name or symbol...'
				id='filter-coins'
				value={filter}
				onChange={(e) => onFilterChange(e.target.value)}
			/>
		</div>
	);
};

export default FilterInput;

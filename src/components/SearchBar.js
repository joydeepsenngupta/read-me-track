import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
	
	constructor(props) {
		super(props);
		this.timeout = null;
	}

	static propTypes = {
		query: PropTypes.string.isRequired,
		onUpdateQuery: PropTypes.func.isRequired,
		onSearch: PropTypes.func.isRequired,
		onClear: PropTypes.func.isRequired
	};

	// Update search query displayed on search bar in real time
	handleChange = event => {
		const newQuery = event.target.value;
		this.props.onUpdateQuery(newQuery);
	};

	// Make search or clear calls only 500 milliseconds after typing stops
	// This is to prevent making excess API calls & a laggy UI
	timedSearch = () => {
		clearTimeout(this.timeout);
		const { query, onSearch, onClear } = this.props;
		this.timeout = setTimeout(() => {
			query ? onSearch(query) : onClear();
		}, 500);
	};

	render() {
		return (
			<div className="search-books-bar">
				<Link className="close-search" to="/">
					Close
				</Link>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title or author"
						value={this.props.query}
						onChange={this.handleChange}
						onKeyUp={this.timedSearch}
					/>
				</div>
			</div>
		);
	}
}

export default SearchBar;
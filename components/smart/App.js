import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeFilter, changeQuery, retrieveMovie } from '../actions';
import Movie from '../dumb/Movie';
import Search from '../dumb/Search';
import { SearchFilterArray } from '../../const/SEARCH_FILTERS';
import { FETCH_STATUS } from '../../const/FETCH_STATUS';

class App extends Component {

	static propTypes = {
		filter: React.PropTypes.string,
		status: React.PropTypes.string.isRequired,
		movie: React.PropTypes.object,
		query: React.PropTypes.string
	}

	constructor(props) {
		super(props);
	}

	onChangeFilter = (filter) => {
		this.props.dispatch(changeFilter(filter));
	}

	onChangeInput = (content) => {
		this.props.dispatch(changeQuery(content));
	}

	onSearch = () => {
		this.props.dispatch(retrieveMovie);
	}

	render() {
		const { status } = this.props;

		return (
			<div>
				<div id='search-container'>
					<Search onSearch={ this.onSearch } filters={ SearchFilterArray } onInputChange={ this.onInputChange } onChangeFilter={ this.onChangeFilter }/>
				</div>
				{
					status === FETCH_STATUS.PENDING
					&& (
						<div id='loading-container'>
							LOADING...
						</div>
					)
				}
				{
					status === FETCH_STATUS.ERROR
					&& (
						<div id='error-container'>
							Sorry, an error has occurred retrieving the requested content! Now PANIC!
						</div>
					)
				}
				{
					status === FETCH_STATUS.COMPLETE
					&& (
						<div id='movie-container'>
							<Movie movie={ movie }/>
						</div>
					)
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { filter, movie, query, status } = state;

	return {
		filter,
		movie,
		query,
		status
	};
}

export default connect(mapStateToProps)(App);
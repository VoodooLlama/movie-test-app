import { APP_ACTIONS } from '../const/APP_ACTIONS';
import { combineReducers } from 'redux';
import { FETCH_STATUS } from '../const/FETCH_STATUS';
import { SEARCH_FILTERS } from '../const/SEARCH_FILTERS';
import { UI_ACTIONS } from '../const/UI_ACTIONS';

const DEFAULT_STATE = {
	filter: SEARCH_FILTERS.MOVIE,
	movie: null,
	query: '',
	status: FETCH_STATUS.INIT
};

function changeQuery(state = { }, action) {
	switch (action.type) {
		case UI_ACTIONS.CHANGE_FILTER:
			return Object.assign({}, state, {
				filter: action.filter
			});
		case UI_ACTIONS.CHANGE_QUERY:
			return Object.assign({}, state, {
				query: action.query
			});
		default:
			return state;
	}
}

function getMovie(state = DEFAULT_STATE, action) {
	switch (action.type) {
		case APP_ACTIONS.REQUEST_MOVIE:
			return Object.assign({}, state, {
				status: action.status
			});
		case APP_ACTIONS.RESPONSE_MOVIE:
			return Object.assign({}, state, {
				status: action.status,
				movie: action.json
			});
		default:
			return state;
	}
}

const baseReducer = combineReducers({
	changeQuery,
	getMovie
});

export default baseReducer;
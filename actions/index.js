import fetch from 'isomorphic-fetch';
import { APP_ACTIONS } from 'const/APP_ACTIONS';
import { UI_ACTIONS } from 'const/UI_ACTIONS';

function requestMovie() {
	return {
		type: APP_ACTIONS.REQUEST_MOVIE,
		status: FETCH_STATUS.PENDING
	};
}

function requestError(statusCode) {
	return {
		type: APP_ACTION.RESPONSE_ERROR,
		status: FETCH_STATUS.ERROR
	};
}


function responseMovie(json) {
	return {
		type: APP_ACTIONS.RESPONSE_MOVIE,
		status: FETCH_STATUS.COMPLETE,
		json
	};
}

/**
 * Action to update the query filter
 */
export function changeFilter(filter) {
	return {
		type: UI_ACTIONS.CHANGE_FILTER,
		filter
	};
}

/**
 * Action to update the query text
 * @param  {[type]} content [description]
 */
export function changeQuery(query) {
	return {
		type: UI_ACTIONS.CHANGE_QUERY,
		query
	};
}

/**
 * Action to retrieve the movie information from an endpoint
 * Dispatches an error action if the web request fails
 * @param  {[type]} query  [description]
 * @param  {[type]} filter [description]
 * @return {[type]}        [description]
 */
export function retrieveMovie(query, filter) {
	return (dispatch) => {
		dispatch(requestMovie());

		let url = `http://www.omdbapi.com/?t=${query}&type=${filter}`;

		return fetch(url).then((response) => {
			if (response.status >= 400) {
				dispatch(requestError(response.status));
				return null;
			}
			return response.json();
		}).then((json) => {
			if (json !== null) {
				dispatch(responseMovie(query, json));
			}
		});
	};
}
import React, { Component, PropTypes } from 'react';

export default class Movie extends Component {

	static propTypes = {
		movie: React.PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
	}

	render() {
		const { movie } = this.props;

		return (
			<div className='movie'>
				{ movie.title }
			</div>
		);
	}
}

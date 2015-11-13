import React, { Component } from 'react';

export default class Search extends Component {

	static propTypes = {
		onSearch: React.PropTypes.func.isRequired,
		onChangeFilter: React.PropTypes.func.isRequired,
		filters: React.PropTypes.array.isRequired,
		onChangeInput: React.PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
	}

	render() {
		const { filters, onSearch, onChangeFilter, onChangeInput } = this.props;

		return (
			<div className='search'>
				<div id='input-container'>
					<input type='text' className='input' onChange={ onChangeInput } />
				</div>
				<div id='select-container'>
					<select className='select' onChange={ onChangeFilter }>
					{
						filters.map((filter) => {
							return (
								<option value={ filter.toLowerCase() }>{ filter }</option>
							);
						})
					}
					</select>
				</div>
				<div id='button-container'>
					<input type='button' onClick={ onSearch } />
				</div>
			</div>
		);
	}
}
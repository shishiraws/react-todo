var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var TodoSearch = React.createClass({

	render: function() {
		var {showCompleted, searchText, dispatch} = this.props;

		return (
			<div>
				<div>
					<input type="search" ref="searchText" placeholder="Search Todo" value={searchText} onChange={() => {
						dispatch(actions.setSearchText(this.refs.searchText.value));
					}} />
				</div>
				<div>
					<label>
						<input type="checkbox" ref="showComplete" checked={showCompleted} onChange={() => {
							dispatch(actions.toggleShowCompleted());
						}} />
						Show Completed Todos
					</label>
				</div>
			</div>
		)
	}
});

export default connect(
	(state) => {
		return {
			showCompleted: state.showCompleted,
			searchText: state.searchText
		};
	}
)(TodoSearch);
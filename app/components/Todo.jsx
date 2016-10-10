var React = require('react');
var actions = require('actions');
var {connect} = require('react-redux');

export var Todo = React.createClass({
	render: function() {
		var {id, text, completed, dispatch} = this.props;
		return (
			<div onClick={() => {
				//this.props.onToggle(id);
				dispatch(actions.startToggleTodo(id, !completed));
			}}>
				<input type="checkbox" checked={completed}/>
				{text}
			</div>
		)
	}
});

export default connect()(Todo);
var React = require('react');
var UUID = require('node-uuid');

import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';

export var TodoApp = React.createClass({

	render: function() {
		return (
			<div>
				<TodoSearch/>
				<TodoList/>
				<AddTodo/>
			</div>
		)
	}
});

export default TodoApp;
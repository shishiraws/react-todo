import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';


export var TodoApp = React.createClass({

	onLogout: function(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.startLogout());
	},

	render: function() {
		return (
			<div>
				<div className="page-actions">
					<a href="#" onClick={this.onLogout}>Logout</a>
				</div>
				
				<h3>Todo App</h3>
				
				<div className="row">
					<div className="columns small-centered small-10 medium-6 large-4">
						<div className="container">
							<TodoSearch/>
							<TodoList/>
							<AddTodo/>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default Redux.connect()(TodoApp);
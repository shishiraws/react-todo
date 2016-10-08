var React = require('react');
var UUID = require('node-uuid');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({

	getInitialState: function () {
		return {
			todos: TodoAPI.getTodos(),
			showCompleted: false,
			searchText: ''
		};
	},

	componentDidUpdate: function () {
		TodoAPI.setTodos(this.state.todos);
	},
	
	handleAddTodo: function(text) {
		this.setState({
			todos: [
				...this.state.todos,
				{
					id: UUID(),
					text: text,
					completed: false
				}
			]
		});
	},
	
	handleSearch: function(showCompleted, searchText) {
		this.setState({
			showCompleted: showCompleted,
			searchText: searchText.toLowerCase()
		});
	},
	
	handleToggle: function(id) {
		var updatedTodo = this.state.todos.map((todo) => {
			if(id === todo.id) {
				todo.completed = !todo.completed;				
			}
			return todo;
		});
		
		this.setState({
			todos: updatedTodo
		});
	},
	
	render: function() {
		var {todos, showCompleted, searchText} = this.state;
		var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

		return (
			<div>
				<TodoSearch onSearch={this.handleSearch}/>
				<TodoList todos={filteredTodos} onToggle={this.handleToggle}/>
				<AddTodo onAdd={this.handleAddTodo} />
			</div>
		)
	}
});

module.exports = TodoApp;
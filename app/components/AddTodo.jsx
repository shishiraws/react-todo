var React = require('react');

var AddTodo = React.createClass({

	onFormSubmit: function (e) {
		e.preventDefault();
		var todoText = this.refs.todoText.value;
		if(todoText && todoText.length>0) {
			this.refs.todoText.value = '';
			this.props.onAdd(todoText);
		} else {
			this.refs.todoText.focus();
		}
	},
	
	render: function() {
		var {id, text} = this.props;
		
		return (
			<div>
				<form onSubmit={this.onFormSubmit}>
					<input type="text" placeholder="What you want todo" ref="todoText"/>
					<button className="button expanded small" >Add Todo</button>
				</form>
			</div>
		)
	}
});

module.exports = AddTodo;
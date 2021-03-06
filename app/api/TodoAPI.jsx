var $ = require('jquery');

module.exports = {
    getTodos: function () {
        var stringTodos = localStorage.getItem('todos');
        var todos = [];
        try {
            todos = JSON.parse(stringTodos);
        } catch (e) {

        }

        return $.isArray(todos) ? todos : [];
    },
    
    setTodos: function (todos) {
        if($.isArray(todos)) {
            localStorage.setItem('todos', JSON.stringify(todos));
            return todos;
        }
    }, 

    filterTodos: function (todos, showCompleted, searchText) {
        var filteredTodos = todos;

        if(todos && todos.length>0) {
            // Filter by showCompleted
            filteredTodos = filteredTodos.filter((todo) => {
                return !todo.completed || showCompleted;
            });

            // Filter by searchText
            filteredTodos = filteredTodos.filter((todo) => {
                var text = todo.text.toLowerCase();
                return text.length === 0 || text.indexOf(searchText) > -1;
            });

            // Sort todos with non-completed first
            filteredTodos.sort((a, b) => {
                if(!a.completed && b.completed) {
                    return -1;
                } else if(a.completed && !b.completed) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }

        return filteredTodos;
    }
};
import moment from 'moment';

import firebase, {firebaseRef, githubProvider} from 'app/firebase/';

export var setSearchText = (searchText) => {
  return {
      type: 'SET_SEARCH_TEXT',
      searchText
  };
};

export var addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    };
};

export var startAddTodo = (text) => {
	return (dispatch, getState) => {
		var todo = {
			text,
			completed: false,
			created: moment().unix(),
			completedAt: null
		};
		
		var todoRef = firebaseRef.child('todos').push(todo);
		return todoRef.then(() => {
			dispatch(addTodo({
				...todo,
				id: todoRef.key
			}));
		});
	};
};

export var addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    };
};

export var startAddTodos = () => {
	return (dispatch, getState) => {
		var todosRef = firebaseRef.child('todos');
		todosRef.once('value').then((snapshot) => {
			var todosObject = snapshot.val() || {};
			var todos = [];
			Object.keys(todosObject).map((id) => {
				return todos.push({
					id: id,
					...todosObject[id]
				});
			});			
			dispatch(addTodos(todos));
		}, (e) => {
			console.log('Unable to fetch data from firebase');
		});
	};
};

export var toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

export var updateTodo = (id, updates) => {
    return {
        type: 'UPDATE_TODO',
        id,
        updates
    };
};

export var startToggleTodo = (id, completed) => {
	return (dispatch, getState) => {
		var todoRef = firebaseRef.child(`todos/${id}`);
		var updates = {
			completed: completed,
			completedAt: completed ? moment().unix() : null
		};
		
		return todoRef.update(updates).then(() => {
			dispatch(updateTodo(id, updates));
		});
	}
}

export var startLogin = () => {
	return (dispatch, getState) => {
		firebase.auth().signInWithPopup(githubProvider).then((result) => {
			console.log('Auth worked: ', result);
		}, (e) => {
			console.log('error: ', e);
		});
	};
};

export var startLogout = () => {
	return (dispatch, getState) => {
		firebase.auth().signOut().then(() => {
			console.log('Logout');
		});
	};
};

export var login = (uuid) => {
	return {
		type: 'LOGIN',
		uuid
	};
};

export var logout = () => {
	return {
		type: 'LOGOUT'
	};
};
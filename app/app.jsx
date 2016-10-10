var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, history} = require('react-router');
var {Provider} = require('react-redux');

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';
var TodoAPI = require('TodoAPI');
var actions = require('actions');
var store = require('configureStore').configure();

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(actions.login(user.uid));
		hashHistory.push('/todos');
	} else {
		store.dispatch(actions.logout());
		hashHistory.push('/');
	}
});

store.dispatch(actions.startAddTodos());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

var requireLogin = (nextState, replace, next) => {
	if(!firebase.auth().currentUser) {
		replace('/');
	}
	next();
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
        	<Route path="/">
        		<Route path="todos" component={TodoApp} onEnter={requireLogin}/>
        		<IndexRoute component={Login}/>
        	</Route>
        </Router>
    </Provider>,
  document.getElementById('app')
);

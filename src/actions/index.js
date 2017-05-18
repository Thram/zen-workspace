import { uniqueId } from 'lodash';

const ADD_TODO = 'ADD_TODO';
const addTodo = text => ({
  type: ADD_TODO,
  id: uniqueId('todo_'),
  text,
});

const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});

const TOGGLE_TODO = 'TOGGLE_TODO';
const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

const types = { ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO };

export { types, addTodo, setVisibilityFilter, toggleTodo };

export default { types, addTodo, setVisibilityFilter, toggleTodo };

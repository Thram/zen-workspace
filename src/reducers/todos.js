import { processReducer } from '../utils';
import { types } from '../actions';

const todoReducers = {
  [types.ADD_TODO]: (state, action) => ({
    id: action.id,
    text: action.text,
    completed: false,
  }),
  [types.TOGGLE_TODO]: (state, action) =>
    (state.id !== action.id ? state : { ...state, completed: !state.completed }),
};

const todo = processReducer(todoReducers, {});

const todosReducers = {
  [types.ADD_TODO]: (state, action) => [...state, todo(undefined, action)],
  [types.TOGGLE_TODO]: (state, action) => state.map(t => todo(t, action)),
};

const todos = processReducer(todosReducers, []);

export default todos;

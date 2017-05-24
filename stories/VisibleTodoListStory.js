import React from 'react';
import { Provider } from 'react-redux';
import { uniqueId } from 'lodash';
import { createStore } from 'redux';
import { Group } from '../src/components/pure';
import VisibleTodoList from '../src/containers/VisibleTodoList';
import Filter from '../src/containers/Filter';
import todoApp from '../src/reducers';

const devToolState =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const createTodo = (text, completed = false) => ({
  id: uniqueId('todo_'),
  text,
  completed,
});

const TODOS = [
  createTodo('Task 1'),
  createTodo('Task 2'),
  createTodo('Task 3', true),
  createTodo('Task 4'),
];

const store = createStore(todoApp /* preloadedState, */, {
  todos: TODOS,
  ...devToolState,
});

const AddTodoStory = () => (
  <Provider store={store}>
    <Group container style={{ padding: '2rem' }}>
      <VisibleTodoList />
      <Filter />
    </Group>
  </Provider>
);

export default AddTodoStory;

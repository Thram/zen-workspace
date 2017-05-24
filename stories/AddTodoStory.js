import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Group } from '../src/components/pure';
import AddTodo from '../src/containers/AddTodo';
import todoApp from '../src/reducers';

const store = createStore(
  todoApp /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const AddTodoStory = () => (
  <Provider store={store}>
    <Group container style={{ padding: '2rem' }}>
      <AddTodo />
    </Group>
  </Provider>
);

export default AddTodoStory;

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Group } from '../src/components/pure';
import FilterLink from '../src/containers/FilterLink';
import { FILTER_TYPES } from '../src/constants';
import todoApp from '../src/reducers';

const store = createStore(
  todoApp /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const AddTodoStory = () => (
  <Provider store={store}>
    <Group container style={{ padding: '2rem' }}>
      <FilterLink filter={FILTER_TYPES.all} type="primary">
        Show All!!
      </FilterLink>
    </Group>
  </Provider>
);

export default AddTodoStory;

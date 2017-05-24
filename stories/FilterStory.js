import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Group } from '../src/components/pure';
import Filter from '../src/containers/Filter';
import todoApp from '../src/reducers';

const store = createStore(
  todoApp /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const FooterStory = () => (
  <Provider store={store}>
    <Group container style={{ padding: '2rem' }}>
      <Filter />
    </Group>
  </Provider>
);

export default FooterStory;

/**
 * Created by thram on 21/01/17.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// Server rendering support
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Group } from '../components/pure';
import { Home } from './views';
import todoApp from '../reducers';

const store = createStore(todoApp);

const App = () => (
  <Provider store={store}>
    <Router>
      <Group container style={{ padding: '2rem' }}>
        <Route exact path="/" component={Home} />
      </Group>
    </Router>
  </Provider>
);

export default App;

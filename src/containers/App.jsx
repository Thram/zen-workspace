/**
 * Created by thram on 21/01/17.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Group } from 'pure-components';

// Server rendering support
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Home } from './views';
import todoApp from '../reducers';

const store = createStore(todoApp);

const App = () => (
  <Provider store={store}>
    <Router>
      <Group container>
        <Route exact path="/" component={Home} />
      </Group>
    </Router>
  </Provider>
);

export default App;

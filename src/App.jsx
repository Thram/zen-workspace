/**
 * Created by thram on 21/01/17.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// Server rendering support
// import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Group } from './components/pure';
import Navigation from './containers/Navigation';
import { Todos, Mocks, Icons } from './views';
import Renderer from './Renderer';
import todoApp from './reducers';
import './styles/main.css';

const store = createStore(todoApp);
/**
 * Created by thram on 21/01/17.
 */

const routes = [
  { title: 'Todos', path: '/', component: Todos },
  { title: 'Mocks', path: '/mocks', component: Mocks },
  { title: 'Icons', path: '/icons', component: Icons },
];

const App = () => (
  <Provider store={store}>
    <Router>
      <Group container style={{ padding: '2rem' }}>
        <Navigation routes={routes} title="ToDo List" />
        <Renderer routes={routes} />
      </Group>
    </Router>
  </Provider>
);

export default App;

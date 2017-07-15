/**
 * Created by thram on 21/01/17.
 */
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { webFrame } from 'electron';
import glamorous from 'glamorous';
import Main from './containers/Main';

import './styles/flat-icons.css';
import './styles/main.css';

webFrame.setZoomLevelLimits(1, 1);

const Container = glamorous.div({ width: '100%', height: '100%', position: 'relative' });

const routes = [{ path: '/', component: Main }];

const App = () =>
  (<Router>
    <Container>
      {routes.map(props => <Route key={props.path} exact {...props} />)}
    </Container>
  </Router>);

export default App;

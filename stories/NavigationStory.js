import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Navigation from '../src/containers/Navigation';
import Renderer from '../src/Renderer';
import { Group } from '../src/components/pure';

const routes = [
  { title: 'Home', path: '/', component: () => <div>Home</div> },
  { title: 'Mocks', path: '/mocks', component: () => <div>Mocks</div> },
  { title: 'Icons', path: '/icons', component: () => <div>Icons</div> },
];
const NavigationStory = () => (
  <Router>
    <Group container style={{ padding: '2rem' }}>
      <Navigation routes={routes} title={'Test'} />
      <Renderer routes={routes} />
    </Group>
  </Router>
);

export default NavigationStory;

/**
 * Created by thram on 21/01/17.
 */
import React from 'react';
import { uniqueId } from 'lodash';
import { Route } from 'react-router-dom';
import { Group } from './components/pure';

const Renderer = ({ routes }) => (
  <Group container>
    {routes.map(props => <Route key={uniqueId('route_')} exact {...props} />)}
  </Group>
);

export default Renderer;

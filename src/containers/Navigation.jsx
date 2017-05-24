/**
 * Created by thram on 21/01/17.
 */
import React from 'react';
import { uniqueId } from 'lodash';
// Server rendering support
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Group } from '../components/pure';

const Navigation = ({ title, routes }) => (
  <Group container>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h2>{title}</h2>
      <div style={{ marginLeft: '1rem' }}>
        {routes.map(({ path, title: routeTitle }) => (
          <NavLink
            key={uniqueId('nav_')}
            to={path}
            style={{ padding: '0.2rem 0.5rem' }}
          >
            {routeTitle}
          </NavLink>
        ))}
      </div>
    </div>
  </Group>
);

export default Navigation;

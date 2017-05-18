import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import App from '../src/containers/App';
import { Home } from '../src/containers/views';
import Welcome from './Welcome';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('App', module)
  .add('App Container', () => <App />)
  .add('View Home', () => <Home />);

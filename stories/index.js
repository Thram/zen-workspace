import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import App from '../src/containers/App';
import Welcome from './Welcome';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('App')} />
));

storiesOf('App', module).add('App Container', () => <App />);

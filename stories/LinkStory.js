import React from 'react';

import { action } from '@storybook/addon-actions';
import Link from '../src/components/Link';
import { Group } from '../src/components/pure';

const FlatButtonStory = () => (
  <Group container style={{ padding: '2rem' }}>
    <Link onClick={action('Link Clicked')}>Click me!</Link>
  </Group>
);

export default FlatButtonStory;

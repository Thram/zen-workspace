import React from 'react';

import { action } from '@storybook/addon-actions';
import FlatButton from '../src/components/FlatButton';
import { Group, Image } from '../src/components/pure';

const FlatButtonStory = () => (
  <Group container style={{ padding: '2rem' }}>
    <FlatButton onClick={action('Text Clicked')}>Text</FlatButton>
    <FlatButton onClick={action("I'm Batman!")} style={{ width: '100px' }}>
      <Image src="https://s-media-cache-ak0.pinimg.com/736x/e5/a0/69/e5a06942fa42823c88be5f3a834e063d.jpg" />
    </FlatButton>
  </Group>
);

export default FlatButtonStory;

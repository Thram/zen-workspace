import React from 'react';
import { Group } from '../src/components/pure';
import Icon from '../src/components/Icon';
import '../src/styles/main.css';

const IconStory = () => (
  <Group container style={{ padding: '2rem' }}>
    <h1>Material Icons!</h1>
    <Icon style={{ color: '#E6867A' }}>done</Icon>
    <Icon style={{ color: '#ED4A6A', fontSize: '100px' }}>extension</Icon>
    <Icon style={{ color: '#D9AB91', fontSize: '50px' }}>face</Icon>
    <Icon style={{ color: '#D9D5A7', fontSize: '30px' }}>motorcycle</Icon>
    <Icon style={{ color: '#C7FCD7', fontSize: '80px' }}>pets</Icon>
  </Group>
);

export default IconStory;

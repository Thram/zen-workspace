import React from 'react';
import { Button } from './pure';

const click = onClick => (ev) => {
  ev.preventDefault();
  onClick();
};

const Link = ({ active = false, type = 'primary', children, onClick }) => (
  <Button type={type} onClick={click(onClick)} active={active}>
    {children}
  </Button>
);

export default Link;

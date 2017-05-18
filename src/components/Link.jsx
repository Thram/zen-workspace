import React from 'react';

const click = onClick => (ev) => {
  ev.preventDefault();
  onClick();
};

const Link = ({ active, children, onClick }) =>
  (active
    ? <span>{children}</span>
    : <a role="button" tabIndex="0" onClick={click(onClick)}>
      {children}
    </a>);

export default Link;

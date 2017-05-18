import React from 'react';

const Link = ({ active, children, onClick }) =>
  (active
    ? <span>{children}</span>
    : <a
      role="button"
      tabIndex="0"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>);

export default Link;

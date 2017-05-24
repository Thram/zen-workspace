import React from 'react';

const FlatButton = ({ children, onClick, style = {} }) => (
  <a
    role="button"
    tabIndex="0"
    onClick={onClick}
    style={{ width: '100%', display: 'flex', alignItems: 'center', ...style }}
  >
    {children}
  </a>
);

export default FlatButton;

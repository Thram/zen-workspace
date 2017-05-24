import React from 'react';

const FlatButton = ({ children, expand, onClick, style = {} }) => (
  <a
    role="button"
    tabIndex="0"
    onClick={onClick}
    style={{
      width: expand ? '100%' : 'auto',
      cursor: 'pointer',
      display: 'inline-block',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', ...style }}>
      {children}
    </div>
  </a>
);

export default FlatButton;

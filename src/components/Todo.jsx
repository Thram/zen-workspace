import React from 'react';

const Todo = ({ onClick, completed, text }) => (
  <li
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    <a role="button" tabIndex="0" onClick={onClick}>
      {text}
    </a>
  </li>
);

export default Todo;

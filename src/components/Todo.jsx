import React from 'react';
import { Button, helpers } from '../components/pure';

const Todo = ({ onClick, completed, text }) => (
  <tr className={completed ? helpers.TableRowOdd : ''}>
    <td>
      <Button size="1" onClick={onClick}>{text}</Button>
    </td>
  </tr>
  );

export default Todo;

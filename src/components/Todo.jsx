import React from 'react';
import { helpers } from './pure';
import Icon from './Icon';
import FlatButton from './FlatButton';

const getRowClass = completed => (completed ? helpers.TableRowOdd : '');
const getIcon = completed =>
  (completed ? 'check_box' : 'check_box_outline_blank');

const Todo = ({ onClick, completed, text }) => (
  <tr className={getRowClass(completed)}>
    <td>
      <FlatButton onClick={onClick}>
        <Icon>{getIcon(completed)}</Icon>
        <span style={{ marginLeft: '1rem' }}>{text}</span>
      </FlatButton>
    </td>
  </tr>
);

export default Todo;

import React from 'react';
import Todo from './Todo';
import { Table } from '../components/pure';

const TodoList = ({ todos, onTodoClick }) => (
  <Table size="1/2">
    <tbody>
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
      ))}
    </tbody>
  </Table>
);

export default TodoList;

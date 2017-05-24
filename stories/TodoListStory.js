import React, { Component } from 'react';
import { uniqueId, find } from 'lodash';
import { action } from '@storybook/addon-actions';
import { Group } from '../src/components/pure';
import TodoList from '../src/components/TodoList';

const todoClick = action('Todo Click');

const createTodo = (text, completed = false) => ({
  id: uniqueId('todo_'),
  text,
  completed,
});

const TODOS = [
  createTodo('Task 1'),
  createTodo('Task 2'),
  createTodo('Task 3', true),
  createTodo('Task 4'),
];

export default class TodoListStory extends Component {
  state = {
    todos: TODOS,
  };
  onClick = (id) => {
    todoClick(id);
    this.setState((prevState) => {
      const todo = find(prevState.todos, { id });
      todo.completed = !todo.completed;
      return prevState;
    });
  };
  render = () => (
    <Group container style={{ padding: '2rem' }}>
      <TodoList todos={this.state.todos} onTodoClick={this.onClick} />
    </Group>
  );
}

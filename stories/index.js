import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import TodoList from './TodoListStory';
import FlatButton from './FlatButtonStory';
import Navigation from './NavigationStory';
import AddTodo from './AddTodoStory';
import FilterLink from './FilterLinkStory';
import Icon from './IconStory';
import Link from './LinkStory';
import Filter from './FilterStory';
import VisibleTodoList from './VisibleTodoListStory';
import Todos from './TodosStory';
import Mocks from './MocksStory';

storiesOf('Components', module)
  .addDecorator(withKnobs)
  .add('• Icon', () => <Icon />)
  .add('• Link', () => <Link />)
  .add('• Flat Button', () => <FlatButton />)
  .add('• Todo List', () => <TodoList />);
storiesOf('Containers', module)
  .addDecorator(withKnobs)
  .add('• Navigation', () => <Navigation />)
  .add('• Add Todo', () => <AddTodo />)
  .add('• Filter Link', () => <FilterLink />)
  .add('• Filter', () => <Filter />)
  .add('• Visible Todo List', () => <VisibleTodoList />);
storiesOf('Views', module)
  .addDecorator(withKnobs)
  .add('• Todos', () => <Todos />)
  .add('• Mocks', () => <Mocks />);

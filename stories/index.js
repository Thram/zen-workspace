import React from 'react';

import { storiesOf, setAddon } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { setOptions } from '@storybook/addon-options';
import infoAddon from '@storybook/addon-info';

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
import { Button } from '../src/components/pure';

setOptions({
  name: 'Starter Kit: React',
  url: 'https://github.com/TouchtechLtd/starter-kit-react',
  showLeftPanel: true,
  downPanelInRight: true,
});

setAddon(infoAddon);

storiesOf('Addons', module)
  .addDecorator(withKnobs)
  .addWithInfo(
    '• Info',
    "This is the basic usage of the `info addon`. Don't forget to define your `propTypes` .",
    () => <Button onClick={action('Button Clicked')}>Click Me!</Button>,
  )
  .add('• Knobs', () => (
    <div
      style={object('style', {
        margin: '1rem',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        padding: '1rem',
        background: '#5CACC4',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
      })}
    >
      Edit my Styles!!
    </div>
  ));
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

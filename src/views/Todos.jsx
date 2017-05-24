import React from 'react';
import Filter from '../containers/Filter';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import { Group } from '../components/pure';

const Home = () => (
  <Group container>
    <AddTodo />
    <VisibleTodoList />
    <Filter />
  </Group>
);

export default Home;

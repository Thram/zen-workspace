import React from 'react';
import Footer from '../containers/Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import { Group } from '../components/pure';

const Home = () => (
  <Group container>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Group>
);

export default Home;

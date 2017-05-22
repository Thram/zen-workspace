import React from 'react';
import Footer from '../Footer';
import AddTodo from '../AddTodo';
import VisibleTodoList from '../VisibleTodoList';
import { Group } from '../../components/pure';

const Home = () => (
  <Group container>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Group>
);

export default Home;

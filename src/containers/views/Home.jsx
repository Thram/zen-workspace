import React from 'react';
import Footer from '../Footer';
import AddTodo from '../AddTodo';
import VisibleTodoList from '../VisibleTodoList';

const Home = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default Home;

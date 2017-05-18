import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const filters = {
  SHOW_COMPLETED: todos => todos.filter(t => t.completed),
  SHOW_ACTIVE: todos => todos.filter(t => !t.completed),
};

const getVisibleTodos = (todos = [], filter) =>
  (filters[filter] ? filters[filter](todos) : todos);

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToProps = dispatch => ({
  onTodoClick: (id) => {
    dispatch(toggleTodo(id));
  },
});

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;

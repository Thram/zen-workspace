import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';
import { FILTER_TYPES } from '../constants';

const { active: ACTIVE, completed: COMPLETED } = FILTER_TYPES;

const filters = {
  [COMPLETED]: todos => todos.filter(t => t.completed),
  [ACTIVE]: todos => todos.filter(t => !t.completed),
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

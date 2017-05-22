import reducers from '../src/reducers';
import { addTodo, toggleTodo } from '../src/actions';

describe('--- Todos Tests ---', () => {
  test('Add Todo', () => {
    const state = reducers({}, addTodo('test'));
    expect(state.todos.length).toBe(1);
  });
  test('Toggle Todo', () => {
    const stateBefore = reducers({}, addTodo('test'));
    const state = reducers(stateBefore, toggleTodo(stateBefore.todos[0].id));
    expect(state.todos[0].completed).toBeTruthy();
  });
});

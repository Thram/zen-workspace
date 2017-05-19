import test from 'tape';

import reducers from '../src/reducers';
import { addTodo, toggleTodo } from '../src/actions';

test('--- Todos Tests ---', (mainAssert) => {
  mainAssert.test('Add Todo', (assert) => {
    const state = reducers({}, addTodo('test'));

    assert.equal(state.todos.length, 1);

    assert.end();
  });
  mainAssert.test('Toggle Todo', (assert) => {
    const stateBefore = reducers({}, addTodo('test'));
    const state = reducers(stateBefore, toggleTodo(stateBefore.todos[0].id));

    assert.ok(state.todos[0].completed);

    assert.end();
  });
  mainAssert.end();
});

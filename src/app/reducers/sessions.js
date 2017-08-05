import { union } from 'lodash';
import { processReducer } from '../utils';
import { types } from '../actions/sessions';

const { ADD_SESSION, REMOVE_SESSION } = types;

const reducers = {
  [ADD_SESSION]: (state, { payload }) => union(state, [payload]),
  [REMOVE_SESSION]: (state, { payload }) => state.filter(s => s !== payload),
};

export default processReducer(reducers, ['default']);

import { remove } from 'lodash';
import { processReducer } from '../utils';
import { types } from '../actions/sessions';

const { ADD_SESSION, REMOVE_SESSION } = types;

const reducers = {
  [ADD_SESSION]: (state, { payload }) => [...state, payload],
  [REMOVE_SESSION]: (state, { payload }) => remove(state, payload),
};

export default processReducer(reducers, ['thram']);

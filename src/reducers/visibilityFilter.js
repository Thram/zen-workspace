import { processReducer } from '../utils';
import { types } from '../actions';

const reducers = {
  [types.SET_VISIBILITY_FILTER]: (state, action) => action.filter,
};

const visibilityFilter = processReducer(reducers);

export default visibilityFilter;

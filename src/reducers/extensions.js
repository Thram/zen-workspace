import { includes, remove } from 'lodash';
import { processReducer } from '../utils';
import { types } from '../actions/extensions';
import { extensions } from '../api';

const { TOGGLE_EXTENSION } = types;

const reducers = {
  [TOGGLE_EXTENSION]: (state, { meta }) => ({
    ...state,
    enabled: includes(state.enabled, meta.id)
      ? remove(state.enabled, meta.id)
      : [...state.enabled, meta.id],
  }),
};

export default processReducer(reducers, { list: extensions.list(), enabled: [] });

import { reject } from 'lodash';
import { processReducer } from '../utils';
import { types } from '../actions/apps';

const { ADD_APP, UPDATE_APP, SELECT_APP, REMOVE_APP } = types;

const reducers = {
  [ADD_APP]: (state, { payload }) => [...state.map(app => ({ ...app, selected: false })), payload],
  [SELECT_APP]: (state, { meta }) => state.map(app => ({ ...app, selected: app.id === meta.id })),
  [REMOVE_APP]: (state, { meta }) => reject(state, ({ id }) => id === meta.id),
  [UPDATE_APP]: (state, { payload, meta }) =>
    state.map(app => (app.id === meta.id ? { ...app, ...payload } : app)),
};

export default processReducer(reducers, []);

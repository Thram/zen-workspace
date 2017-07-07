import { processReducer } from '../utils';
import { types } from '../actions/apps';

const { ADD_APP, UPDATE_APP, SELECT_APP } = types;

const reducers = {
  [ADD_APP]: (state, { payload }) => [...state.map(app => ({ ...app, slected: false })), payload],
  [SELECT_APP]: (state, { meta }) => state.map(app => ({ ...app, selected: app.id === meta.id })),
  [UPDATE_APP]: (state, { payload, meta }) =>
    state.map(app => (app.url === meta.url ? { ...app, meta: payload.meta } : app)),
};

export default processReducer(reducers, []);

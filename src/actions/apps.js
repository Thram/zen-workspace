import uuidv5 from 'uuid/v5';
import { normalizeMeta, getRandomColor } from '../utils';

const ADD_APP = 'ADD_APP';
const addApp = url => ({
  type: ADD_APP,
  payload: { id: uuidv5(url, uuidv5.URL), url, selected: true, color: getRandomColor() },
});

const UPDATE_APP = 'UPDATE_APP';
const updateApp = ({ url, meta }) => ({
  type: UPDATE_APP,
  payload: { meta: normalizeMeta(meta, url) },
  meta: { url },
});

const SELECT_APP = 'SELECT_APP';
const selectApp = id => ({
  type: SELECT_APP,
  meta: { id },
});

const types = { ADD_APP, UPDATE_APP, SELECT_APP };

export { types, addApp, updateApp, selectApp };

export default { types, addApp, updateApp, selectApp };

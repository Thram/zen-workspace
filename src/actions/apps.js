import uuidv5 from 'uuid/v5';
import { htmlMetadata } from '../api';
import { normalizeMeta, getRandomColor } from '../utils';

const ADD_APP = 'ADD_APP';
const addApp = url => (dispatch) => {
  const action = {
    type: ADD_APP,
    payload: {
      id: uuidv5(url, uuidv5.URL),
      url,
      selected: true,
      color: getRandomColor(),
    },
  };
  return htmlMetadata(url).then(
    meta => dispatch({ ...action, meta: normalizeMeta(meta, url) }),
    () => dispatch({ ...action, meta: {} }),
  );
};

const UPDATE_APP = 'UPDATE_APP';
const updateApp = app => ({
  type: UPDATE_APP,
  payload: app,
});

const REMOVE_APP = 'REMOVE_APP';
const removeApp = id => ({
  type: REMOVE_APP,
  meta: { id },
});

const SELECT_APP = 'SELECT_APP';
const selectApp = id => ({
  type: SELECT_APP,
  meta: { id },
});

const types = { ADD_APP, UPDATE_APP, SELECT_APP, REMOVE_APP };

export { types, addApp, updateApp, selectApp, removeApp };

export default { types, addApp, updateApp, selectApp, removeApp };

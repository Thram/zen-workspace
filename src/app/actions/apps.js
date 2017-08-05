import uuidv4 from 'uuid/v4';
import { getRandomColor } from '../colors';

const ADD_APP = 'ADD_APP';
const addApp = ({ url, name, type, session = 'default' }) => ({
  type: ADD_APP,
  payload: {
    id: uuidv4(),
    url,
    name,
    type,
    session,
    selected: true,
    color: getRandomColor(),
  },
});

const UPDATE_APP = 'UPDATE_APP';
const updateApp = (id, update) => ({
  type: UPDATE_APP,
  payload: update,
  meta: { id },
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

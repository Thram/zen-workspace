const ADD_SESSION = 'ADD_SESSION';
const addSession = name => ({
  type: ADD_SESSION,
  payload: name,
});

const REMOVE_SESSION = 'REMOVE_SESSION';
const removeSession = name => ({
  type: REMOVE_SESSION,
  payload: name,
});

const types = { ADD_SESSION, REMOVE_SESSION };

export { types, addSession, removeSession };

export default { types, addSession, removeSession };

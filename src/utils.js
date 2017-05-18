const processReducer = (reducers, initState = {}) => (
  state = initState,
  action,
) => {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

export { processReducer };
export default { processReducer };

import { zipObject, snakeCase } from 'lodash';

const processReducer = (reducers, initState = {}) => (
  state = initState,
  action,
) => {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

const Enum = (...args) => zipObject(args.map(value => snakeCase(value)), args);

export { processReducer, Enum };
export default { processReducer, Enum };

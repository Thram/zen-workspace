const TOGGLE_EXTENSION = 'TOGGLE_EXTENSION';
const toggleExtension = id => ({
  type: TOGGLE_EXTENSION,
  meta: { id },
});

const types = { TOGGLE_EXTENSION };

export { types, toggleExtension };

export default { types, toggleExtension };

import { get, isString, flow, sample } from 'lodash';
import { colors } from 'material-ui';

const processReducer = (reducers, initState = {}) => (state = initState, action) => {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

const checkAbsoluteUrl = url => !!url.match(/^(?:(ht|f)tp(s?):\/\/)?/)[0];

const normalizeUrl = url => (checkAbsoluteUrl(url) ? url : `https://${url}`);

const getMetaSchemaOrg = ({ general = {}, schemaOrg = {} }) => ({
  ...general,
  ...get(schemaOrg, 'items[0].properties', {}),
});
const getMetaOpenGraph = ({ general = {}, openGraph = {} }) => ({ ...general, ...openGraph });

const normalizeMeta = (meta, url) => {
  const normalized = meta.schemaOrg ? getMetaSchemaOrg(meta) : getMetaOpenGraph(meta);
  normalized.image = normalized.image.map(
    value => (isString(value) ? { url: checkAbsoluteUrl(value) ? value : url + value } : value),
  );
  return normalized;
};

const getRandomNumber = (factor = 1) => (min = 1, max = 9) =>
  flow(
    () => Math.random() * max,
    randomFloat => Math.floor(randomFloat),
    randomInteger => randomInteger + min,
    randomInteger => randomInteger * factor,
  )();

const getRandomScaleColor = getRandomNumber(100);

const getRandomColor = () =>
  flow(
    () => Object.keys(colors),
    colorsNames => sample(colorsNames),
    selectedColor => colors[selectedColor][getRandomScaleColor()],
  )();

export { processReducer, normalizeUrl, normalizeMeta, getRandomNumber, getRandomColor };
export default { processReducer, normalizeUrl, normalizeMeta, getRandomNumber, getRandomColor };

import { get, isString, isArray, flow } from 'lodash';

const processReducer = (reducers, initState = {}) => (state = initState, action) => {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

const checkAbsoluteUrl = url => !!url.match(/^(?:(ht|f)tp(s?):\/\/)?/)[0];

const normalizeUrl = url =>
  checkAbsoluteUrl(url) ? url : `https://${url.match(/(.*\/\/)?(.*)$/)[2]}`;

const getMetaSchemaOrg = ({ general = {}, schemaOrg = {} }) => ({
  ...general,
  image: [],
  ...get(schemaOrg, 'items[0].properties', {}),
});
const getMetaOpenGraph = ({ general = {}, openGraph = {} }) => ({
  ...general,
  image: [],
  ...openGraph,
});

const normalizeMeta = (meta, url) => {
  const normalized = meta.schemaOrg ? getMetaSchemaOrg(meta) : getMetaOpenGraph(meta);
  normalized.image = isArray(normalized.image)
    ? normalized.image.map(
      value => (isString(value) ? { url: checkAbsoluteUrl(value) ? value : url + value } : value),
    )
    : [
      isString(normalized.image)
        ? { url: checkAbsoluteUrl(normalized.image) ? normalized.image : url + normalized.image }
        : normalized.image,
    ];
  return normalized;
};

const getRandomNumber = (factor = 1) => (min = 1, max = 9) =>
  flow(
    () => Math.random() * max,
    randomFloat => Math.floor(randomFloat),
    randomInteger => randomInteger + min,
    randomInteger => randomInteger * factor,
  )();

const onPressEnter = onSubmit => ev => ev.which === 13 && onSubmit();

export { processReducer, normalizeUrl, normalizeMeta, getRandomNumber, onPressEnter };
export default {
  processReducer,
  normalizeUrl,
  normalizeMeta,
  getRandomNumber,
  onPressEnter,
};

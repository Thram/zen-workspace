// Using JSONPlaceholder
// For more info: https://github.com/typicode/jsonplaceholder#how-to
import { keys } from 'lodash';
const FAKER_API = 'https://jsonplaceholder.typicode.com';
const jsonToQueryString = json =>
  `?${keys(json)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
    .join('&')}`;

const getFake = schema => params =>
  fetch(`${FAKER_API}/${schema}?${jsonToQueryString(params)}`).then(res =>
    res.json(),
  );

const getUsers = getFake('users');

const getPosts = getFake('posts');

const getAlbums = getFake('albums');

const getPhotos = getFake('photos');

const getTodos = getFake('todos');

export { getUsers, getPosts, getAlbums, getPhotos, getTodos };

export default { getUsers, getPosts, getAlbums, getPhotos, getTodos };

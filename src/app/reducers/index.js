import { combineReducers } from 'redux';
import apps from './apps';
import extensions from './extensions';
import sessions from './sessions';

export default combineReducers({ apps, sessions, extensions });

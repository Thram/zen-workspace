/**
 * Created by thram on 3/04/17.
 */
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';
import { createStore, compose, applyMiddleware } from 'redux';
import { MuiThemeProvider } from 'material-ui/styles';

import reducers from './reducers';
import App from './App';

const store = compose(autoRehydrate(), applyMiddleware(logger))(createStore)(reducers);
persistStore(store);

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app'),
);

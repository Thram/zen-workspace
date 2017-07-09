import React from 'react';
import { findDOMNode } from 'react-dom';
import { camelCase, zipObject, forEach } from 'lodash';
import { getPath } from '../api';

const EVENTS = [
  'load-commit',
  'did-finish-load',
  'did-fail-load',
  'did-frame-finish-load',
  'did-start-loading',
  'did-stop-loading',
  'did-get-response-details',
  'did-get-redirect-request',
  'dom-ready',
  'page-title-set',
  'page-favicon-updated',
  'enter-html-full-screen',
  'leave-html-full-screen',
  'console-message',
  'new-window',
  'close',
  'ipc-message',
  'crashed',
  'gpu-crashed',
  'plugin-crashed',
  'destroyed',
];

const HANDLERS = EVENTS.map(event => camelCase(`on-${event}`));

const EVENTS_HANDLERS = zipObject(HANDLERS, EVENTS);
const tagPropTypes = {
  autosize: React.PropTypes.bool,
  disablewebsecurity: React.PropTypes.bool,
  httpreferrer: React.PropTypes.string,
  nodeintegration: React.PropTypes.bool,
  plugins: React.PropTypes.bool,
  preload: React.PropTypes.string,
  src: React.PropTypes.string,
  useragent: React.PropTypes.string,
  partition: React.PropTypes.string,
  allowpopups: React.PropTypes.bool,
  webpreferences: React.PropTypes.string,
  blinkfeatures: React.PropTypes.string,
  disableblinkfeatures: React.PropTypes.string,
  guestinstance: React.PropTypes.string,
};

const eventPropTypes = HANDLERS.reduce(
  (propTypes, handler) => ({ ...propTypes, [handler]: React.PropTypes.func }),
  {},
);

export default class WebView extends React.Component {
  static propTypes = { ...tagPropTypes, ...eventPropTypes };

  componentDidMount() {
    // Set up listeners.
    this.webview = findDOMNode(this);
    this.bindEvents();
    this.assignMethods();
  }

  bindEvents = () =>
    forEach(EVENTS_HANDLERS, (event, handler) =>
      this.webview.addEventListener(event, this.props[handler]),
    );

  assignMethods = () =>
    this.webview.addEventListener('dom-ready', () =>
      Object.getOwnPropertyNames(this.webview)
        .filter(prop => typeof prop === 'function')
        .forEach(method => (this[method] = this.webview[method])),
    );

  tagProps = () =>
    Object.keys(this.props)
      .filter(propName => !(propName in eventPropTypes))
      .reduce((filtered, key) => ({ ...filtered, [key]: this.props[key] }), {});

  render = () =>
    (<webview
      ref={ref => (this.view = ref)}
      is
      {...this.tagProps()}
      preload={`file:///${getPath('injector.js')}`}
    />);
}

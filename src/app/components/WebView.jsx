import React, { Component } from 'react';
import omit from 'lodash/omit';
import wildcard from 'wildcard';
import { Motion, spring } from 'react-motion';
import { extensions as extensionsApi, tools as toolsApi } from '../api';
import ElectronWebView from './ElectronWebView';

class WebView extends Component {
  constructor(props) {
    super(props);
    this.actions = {
      STATUS: this.props.onStatus,
      NOTIFICATION: this.props.onNotification,
      FAVICON: this.props.onIcon,
    };
  }

  setupExtentions = () => {
    this.props.extensions.forEach((manifest) => {
      const { styles, scripts, matches } = extensionsApi.getSetup(manifest);
      let applyExtension = false;
      matches.forEach((match) => {
        applyExtension = !!wildcard(match, this.webView.getURL()) || applyExtension;
      });

      if (applyExtension) {
        this.webView.insertCSS(styles);
        this.webView.executeJavaScript(
          `window.EXTENSIONS = window.EXTENSIONS ? [].concat(window.EXTENSIONS,"${manifest.id}"): ["${manifest.id}"]; 
        ${scripts}`,
          false,
          () => console.log(`Extension ${manifest.id} Loaded`),
        );
      }
    });
  };

  setupEnvironment = (ev) => {
    const { innerRef, onDomReady } = this.props;
    this.webView = ev.currentTarget;
    // if (process.env.NODE_ENV === 'development') this.webView.openDevTools();
    this.webView.openDevTools();
    this.webView.executeJavaScript(
      `window.WORKSPACE_APP_ID = "${this.props.id}"; 
       window.WORKSPACE_APP_NAME = "${this.props.name || 'custom'}"; 
       window.WORKSPACE_APP_TYPE = "${this.props.type || 'default'}"; 
       ${toolsApi.setupScript()}`,
      false,
      () => console.log('Fixes Loaded'),
    );
    this.setupExtentions();
    if (innerRef) innerRef(this.webView);
    if (onDomReady) onDomReady(ev);
  };

  processIpcMessage = (message) => {
    const action = this.actions[message.type];
    if (action) action(message);
    console.log(message);
  };

  render = () => {
    const { active, style, persist } = this.props;
    return (
      <Motion style={{ opacity: spring(active ? 1 : 0) }}>
        {({ opacity }) =>
          (<ElectronWebView
            onNewWindow={({ url }) => toolsApi.openExternal(url)}
            onIpcMessage={({ channel }) => this.processIpcMessage(channel)}
            onDomReady={this.setupEnvironment}
            partition={`persist:${persist}`}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'white',
              display: 'inline-flex',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity,
              zIndex: active ? 10 : 0,
              ...style,
            }}
            {...omit(this.props, ['style', 'active', 'innerRef', 'extensions', 'presist'])}
          />)}
      </Motion>
    );
  };
}

export default WebView;

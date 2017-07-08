import React, { Component } from 'react';
import omit from 'lodash/omit';
import wildcard from 'wildcard';
import { extensions as extensionsApi, tools as toolsApi } from '../api';
import ElectronWebView from './ElectronWebView';

const USER = 'thram';

class WebView extends Component {
  setupExtentions = () => {
    this.props.extensions.forEach((manifest) => {
      const { styles, scripts, matches } = extensionsApi.getSetup(manifest);
      let applyExtension = false;
      matches.forEach((match) => {
        applyExtension = !!wildcard(match, this.webView.getURL()) || applyExtension;
      });
      this.webView.executeJavaScript(
        `window.WORKSPACE_APP_ID = "${this.props.id}"; 
        ${toolsApi.scriptFixes()}`,
        false,
        () => console.log('Fixes Loaded'),
      );
      if (applyExtension) {
        this.webView.insertCSS(styles);
        this.webView.executeJavaScript(scripts, false, () =>
          console.log(`Extension ${manifest.id} Loaded`),
        );
        this.webView.openDevTools();
      }
    });
  };

  render = () => {
    const { innerRef, onDomReady, active, style } = this.props;
    return (
      <ElectronWebView
        onDidGetRedirectRequest={() => this.webView && this.setupExtentions()}
        onIpcMessage={({ channel }) => console.log('ipc', channel)}
        onDomReady={(ev) => {
          this.webView = ev.currentTarget;
          this.setupExtentions();

          if (innerRef) innerRef(this.webView);
          if (onDomReady) onDomReady(ev);
        }}
        partition={`persist:${USER}`}
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
          display: 'inline-flex',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'opacity 1s ease',
          opacity: active ? 1 : 0,
          zIndex: active ? 10 : 0,
          ...style,
        }}
        {...omit(this.props, ['style', 'active', 'innerRef', 'extensions', 'presist'])}
      />
    );
  };
}

export default WebView;

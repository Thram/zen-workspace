import React from 'react';
import omit from 'lodash/omit';
import ElectronWebView from './ElectronWebView';

const USER = 'thram';

const WebView = props =>
  (<ElectronWebView
    onDomReady={(ev) => {
      if (props.innerRef) props.innerRef(ev.currentTarget);
      if (props.onDomReady) props.onDomReady(ev);
    }}
    {...omit(props, ['style', 'active', 'innerRef'])}
    partition={`persist:${USER}_${props.src}`}
    style={{
      height: '100%',
      width: '100%',
      display: 'inline-flex',
      position: 'absolute',
      top: 0,
      left: 0,
      transition: 'opacity 1s ease',
      opacity: props.active ? 1 : 0,
      zIndex: props.active ? 10 : 0,
      ...props.style,
    }}
  />);

export default WebView;

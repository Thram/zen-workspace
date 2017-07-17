import React, { Component } from 'react';
import { find } from 'lodash';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import { normalizeUrl } from '../utils';
import { updateApp } from '../actions/apps';
import WebView from '../components/WebView';

const Container = glamorous.div({ width: '100%', height: '100%', position: 'relative' });

class Workspace extends Component {
  state = {
    showDashboard: true,
  };

  setRef = id => (ref) => {
    this.apps[id] = ref;

    // console.log(ref.getUserAgent());
    // Mobile User Agent (TODO: Change the User Agent depending the size of the screen)
    // ref.setUserAgent(
    //   'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K)
    // AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    // );
  };

  apps = {};

  render = () => {
    const { apps, sessions, extensions, setAvatar, setNotifications, setStatus } = this.props;
    return (
      <Container>
        {apps.map(({ id, name, session, avatar, type = 'default', url, selected }) =>
          (<WebView
            extensions={extensions.enabled.map(extId => find(extensions.list, { id: extId }))}
            onStatus={({ payload, meta }) => setStatus(meta.id, payload)}
            onNotification={({ payload, meta }) => setNotifications(meta.id, payload)}
            onIcon={({ payload, meta }) => !avatar && setAvatar(meta.id, payload.url)}
            key={`webview_${id}`}
            id={id}
            name={name}
            type={type}
            persist={session || sessions[0]}
            innerRef={this.setRef(id)}
            src={url}
            active={selected}
          />),
        )}
      </Container>
    );
  };
}

export default connect(
  ({ apps, sessions, extensions }) => ({ apps, sessions, extensions }),
  dispatch => ({
    setAvatar: (id, url) => dispatch(updateApp(id, { avatar: normalizeUrl(url) })),
    setNotifications: (id, notifications) => dispatch(updateApp(id, { notifications })),
    setStatus: (id, status) => dispatch(updateApp(id, { status })),
  }),
)(Workspace);

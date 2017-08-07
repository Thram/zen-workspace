import React, { Component } from 'react';
import glamorous from 'glamorous';
import { isURL } from 'validator';
import { capitalize } from 'lodash';
import { Motion, spring } from 'react-motion';
import { MailOutline, DateRange, Add, Remove, Web } from 'material-ui-icons';
import { TextField, IconButton, Typography, Button } from 'material-ui';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Menu, { MenuItem } from 'material-ui/Menu';
import Input from 'material-ui/Input/Input';
import { normalizeUrl, onPressEnter } from '../utils';
import FlatIcon from './FlatIcon';

// Slack: https://[channel].slack.com
// Trello: https://trello.com
// Harvest: https://[company].harvestapp.com
// Inbox: https://inbox.google.com
// GDrive: https://drive.google.com/drive/my-drive
// Calendar: https://www.google.com/calendar

const APP_TYPES = [
  {
    name: 'website',
    url: '',
    icon: <Web />,
  },
  {
    name: 'slack',
    type: 'slack',
    url: '[channel].slack.com',
  },
  {
    name: 'trello',
    url: 'https://trello.com',
  },
  {
    name: 'dropbox',
    url: 'https://www.dropbox.com',
  },
  {
    name: 'github',
    type: 'github',
    url: 'https://www.github.com',
  },
  {
    name: 'medium',
    url: 'https://www.medium.com',
  },
  {
    name: 'drive',
    type: 'google',
    url: 'https://drive.google.com/drive/my-drive',
  },
  {
    name: 'inbox',
    type: 'google',
    url: 'https://inbox.google.com',
    icon: <MailOutline />,
  },
  {
    name: 'calendar',
    type: 'google',
    url: 'https://www.google.com/calendar',
    icon: <DateRange />,
  },
];

const UrlField = glamorous(TextField)({ flex: 1 });

class AddWebApp extends Component {
  state = {
    type: 'default',
    url: '',
    showCard: false,
    showSession: false,
    sessionAnchor: undefined,
    showShortcuts: false,
    shortcutAnchor: undefined,
    session: 'default',
    shortcut: 'website',
    newSession: undefined,
    error: false,
  };

  componentWillUnmount() {
    if (this.card) {
      this.card.removeEventListener('mouseenter', this.onLeave);
      this.card.removeventListener('mouseleave', this.autoClose);
    }
  }

  onAdd = ({ url, session, name, type }) => {
    console.log('onAdd', session);
    if (isURL(url)) {
      this.toggleCard();
      if (this.props.onAdd) {
        this.props.onAdd({
          session,
          url: normalizeUrl(url),
          name,
          type,
        });
      }
      this.setState({ url: '', name: '', type: 'default' });
    } else {
      this.setState({ error: true });
      this.input.focus();
    }
  };

  onSubmitApp = app =>
    this.state.error ? this.setState({ error: false }) : this.onAdd(app || this.state);

  onNewSessionChange = ev => this.setState({ newSession: ev.target.value });

  onAddSession = () => {
    if (this.state.newSession) {
      this.props.onAddSession(this.state.newSession);
      this.setState({ newSession: '', session: this.state.newSession });
    }
  };

  onRemoveSession = session => (ev) => {
    ev.stopPropagation();
    this.props.onRemoveSession(session);
  };

  onSelectSession = value => () =>
    this.setState({ showSessions: false, session: value || this.state.session });

  onSelectShortcut = shortcut => () => {
    this.setState({ showShortcuts: false, ...shortcut, shortcut: shortcut.name });
    if (shortcut && !/\[.*\]/.test(shortcut.url)) {
      this.onSubmitApp({ ...shortcut, session: this.state.session });
    }
  };

  onLeave = () => clearTimeout(this.countdown);

  getMotion = () => ({
    width: spring(this.state.showCard ? 500 : 0),
    height: spring(this.state.showCard ? 148 : 0),
    opacity: spring(this.state.showCard ? 1 : 0),
  });

  setCardRef = (ref) => {
    if (ref) {
      this.card = ref;
      this.card.addEventListener('mouseenter', this.onLeave);
      this.card.addEventListener('mouseleave', this.autoClose);
    }
  };

  setUrlRef = (ref) => {
    this.input = ref;
  };

  autoClose = () => {
    this.countdown = setTimeout(
      () =>
        !this.state.showSessions &&
        !this.state.showShortcuts &&
        this.input !== document.activeElement &&
        this.toggleCard(),
      3000,
    );
  };

  applyMotion = ({ width, height, opacity }) => ({
    position: 'absolute',
    bottom: '65px',
    left: '50px',
    transform: `scale(${opacity})`,
    opacity,
    height: `${height}px`,
    width: `${width}px`,
  });

  openSessions = event => this.setState({ showSessions: true, sessionAnchor: event.currentTarget });

  openShortcuts = event =>
    this.setState({ showShortcuts: true, shortcutAnchor: event.currentTarget });

  toggleCard = () =>
    this.setState({
      showCard: !this.state.showCard,
      showSession: false,
      showShortcuts: false,
      shortcut: 'website',
    });
  checkFocus = () => this.state.showCard && this.input.focus();

  renderSessionsMenu = () =>
    (<div style={{ flex: 1 }}>
      <Button
        aria-owns={this.state.showSessions ? 'sessions-menu' : null}
        aria-haspopup="true"
        onClick={this.openSessions}
      >
        <strong style={{ marginRight: '1rem' }}>Session:</strong> {this.state.session}
      </Button>
      <Menu
        id="sessions-menu"
        anchorEl={this.state.sessionAnchor}
        open={this.state.showSessions}
        onRequestClose={this.onSelectSession()}
      >
        <MenuItem>
          <Input
            value={this.state.newSession}
            onChange={this.onNewSessionChange}
            placeholder="New session"
            onKeyUp={onPressEnter(this.onAddSession)}
            inputProps={{ 'aria-label': 'New session' }}
          />
          <IconButton aria-label="Add" color="accent" onClick={this.onAddSession}>
            <Add />
          </IconButton>
        </MenuItem>
        {this.props.sessions.map(session =>
          (<MenuItem key={`session_${session}`} onClick={this.onSelectSession(session)}>
            <div style={{ flex: 1 }}>
              {session}
            </div>
            <IconButton aria-label="Remove" color="accent" onClick={this.onRemoveSession(session)}>
              <Remove />
            </IconButton>
          </MenuItem>),
        )}
      </Menu>
    </div>);

  renderShortcutsMenu = () =>
    (<div style={{ flex: 1, textAlign: 'right' }}>
      <Button
        aria-owns={this.state.showShortcuts ? 'shortcuts-menu' : null}
        aria-haspopup="true"
        onClick={this.openShortcuts}
      >
        <strong style={{ marginRight: '1rem' }}>Type:</strong> {this.state.shortcut}
      </Button>
      <Menu
        id="shortcuts-menu"
        anchorEl={this.state.shortcutAnchor}
        open={this.state.showShortcuts}
        onRequestClose={this.onSelectShortcut()}
      >
        {APP_TYPES.map(({ url, name, type, icon }) =>
          (<MenuItem key={`shortcut_${name}`} onClick={this.onSelectShortcut({ url, name, type })}>
            <span style={{ marginRight: '1rem' }}>
              {icon || <FlatIcon name={name} />}
            </span>
            {capitalize(name)}
          </MenuItem>),
        )}
      </Menu>
    </div>);

  render = () =>
    (<div>
      <Button fab color="primary" onClick={this.toggleCard}>
        <Add />
      </Button>
      <Motion style={this.getMotion()} onRest={this.checkFocus}>
        {({ width, height, opacity }) =>
          (<div ref={this.setCardRef}>
            <Card style={this.applyMotion({ width, height, opacity })}>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {this.renderSessionsMenu()}
                  {this.renderShortcutsMenu()}
                </div>
              </CardContent>

              <CardActions style={{ padding: '0 16px' }}>
                <Typography
                  type="subheading"
                  style={{
                    alignSelf: 'flex-end',
                    margin: '0 .5rem 3px 0',
                  }}
                >
                  https://
                </Typography>
                <UrlField
                  inputRef={this.setUrlRef}
                  label="Add web app"
                  value={this.state.url}
                  onChange={event => this.setState({ url: event.target.value })}
                  error={this.state.error}
                  onKeyUp={onPressEnter(this.onSubmitApp)}
                  inputProps={{ placeholder: 'www.github.com' }}
                />
                <IconButton aria-label="Add" color="accent" onClick={this.onSubmitApp}>
                  <Add />
                </IconButton>
              </CardActions>
            </Card>
          </div>)}
      </Motion>
    </div>);
}

export default AddWebApp;

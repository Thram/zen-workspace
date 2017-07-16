import React, { Component } from 'react';
import glamorous from 'glamorous';
import { isURL } from 'validator';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import MailOutline from 'material-ui-icons/MailOutline';
import DateRange from 'material-ui-icons/DateRange';
import { Motion, spring } from 'react-motion';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { normalizeUrl } from '../utils';
import FlatIcon from './FlatIcon';

// Slack: https://[channel].slack.com
// Trello: https://trello.com
// Harvest: https://[company].harvestapp.com
// Inbox: https://inbox.google.com
// GDrive: https://drive.google.com/drive/my-drive
// Calendar: https://www.google.com/calendar

const APP_TYPES = [
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
    component: onClick =>
      (<IconButton onClick={onClick}>
        <MailOutline />
      </IconButton>),
  },
  {
    name: 'calendar',
    type: 'google',
    url: 'https://www.google.com/calendar',
    component: onClick =>
      (<IconButton onClick={onClick}>
        <DateRange />
      </IconButton>),
  },
];

const Shorcuts = glamorous.div({
  fontSize: '1.5rem',
  display: 'flex',
  justifyContent: 'flex-end',
});
const UrlField = glamorous(TextField)({ flex: 1 });

const AppIcon = props =>
  (<IconButton {...props}>
    <FlatIcon name={props.name} />
  </IconButton>);

class AddWebApp extends Component {
  state = {
    type: 'default',
    url: '',
    showCard: false,
    error: false,
  };

  onAdd = () => {
    if (isURL(this.state.url)) {
      this.toggleCard();
      if (this.props.onAdd) {
        this.props.onAdd({
          url: normalizeUrl(this.state.url),
          name: this.state.name,
          type: this.state.type,
        });
      }
      this.setState({ url: '', name: '', type: 'default' });
    } else {
      this.setState({ error: true });
      this.input.focus();
    }
  };

  onPressEnter = (ev) => {
    if (this.state.error) this.setState({ error: false });
    if (ev.which === 13) this.onAdd();
  };

  onShorcutClick = ({ url, name, type }) => () =>
    /\[.*\]/.test(url) ? this.setState({ url, name, type }) : this.props.onAdd({ url, name, type });

  getMotion = () => ({
    width: spring(this.state.showCard ? 500 : 0),
    height: spring(this.state.showCard ? 148 : 0),
    opacity: spring(this.state.showCard ? 1 : 0),
  });

  setRef = (ref) => {
    console.log(ref);
    this.input = ref;
  };

  applyMotion = ({ width, height, opacity }) => ({
    position: 'absolute',
    transform: 'translateY(-100%) translateX(50px)',
    top: 0,
    opacity,
    height: `${height}px`,
    width: `${width}px`,
  });

  toggleCard = () => this.setState({ showCard: !this.state.showCard });
  checkFocus = () => this.state.showCard && this.input.focus();

  render = () =>
    (<div>
      <Button fab color="primary" onClick={this.toggleCard}>
        <AddIcon />
      </Button>
      <Motion style={this.getMotion()} onRest={this.checkFocus}>
        {({ width, height, opacity }) =>
          (<Card style={this.applyMotion({ width, height, opacity })}>
            <CardContent>
              <Shorcuts>
                {APP_TYPES.map(({ url, name, type, component }) =>
                  (<span key={`shortcut_${name}`}>
                    {component
                      ? component(this.onShorcutClick({ url, name, type }))
                      : <AppIcon name={name} onClick={this.onShorcutClick({ url, name, type })} />}
                  </span>),
                )}
              </Shorcuts>
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
                inputRef={this.setRef}
                label="Add web app"
                value={this.state.url}
                onChange={event => this.setState({ url: event.target.value })}
                error={this.state.error}
                onKeyUp={this.onPressEnter}
                inputProps={{ placeholder: 'www.github.com' }}
              />
              <IconButton aria-label="Add" color="accent" onClick={() => this.onAdd()}>
                <AddIcon />
              </IconButton>
            </CardActions>
          </Card>)}
      </Motion>
    </div>);
}

export default AddWebApp;

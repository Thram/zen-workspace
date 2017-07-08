import React, { Component } from 'react';
import glamorous from 'glamorous';
import { isURL } from 'validator';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { Motion, spring } from 'react-motion';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { normalizeUrl } from '../utils';

// Slack: https://[channel].slack.com
// Trello: https://trello.com
// Harvest: https://[company].harvestapp.com
// Inbox: https://inbox.google.com
// GDrive: https://drive.google.com/drive/my-drive
// Calendar: https://www.google.com/calendar

const Content = glamorous(CardContent)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const UrlField = glamorous(TextField)({ flex: 1 });

class AddWebApp extends Component {
  state = {
    showCard: false,
    error: false,
  };

  onAdd = () => {
    if (isURL(this.input.value)) {
      this.toggleCard();
      if (this.props.onAdd) this.props.onAdd(normalizeUrl(this.input.value));
      this.input.value = '';
    } else {
      this.setState({ error: true });
    }
  };

  onPressEnter = (ev) => {
    if (this.state.error) this.setState({ error: false });
    if (ev.which === 13) this.onAdd();
  };

  getMotion = () => ({
    width: spring(this.state.showCard ? 500 : 0),
    height: spring(this.state.showCard ? 82 : 0),
    opacity: spring(this.state.showCard ? 1 : 0),
  });

  setRef = ref => (this.input = ref);

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
            <Content>
              <UrlField
                inputRef={this.setRef}
                label="Add web app"
                type="text"
                error={this.state.error}
                onKeyUp={this.onPressEnter}
                inputProps={{ placeholder: 'https://www.github.com' }}
              />
              <IconButton aria-label="Add" color="accent" onClick={() => this.onAdd()}>
                <AddIcon />
              </IconButton>
            </Content>
            <CardActions />
          </Card>)}
      </Motion>
    </div>);
}

export default AddWebApp;

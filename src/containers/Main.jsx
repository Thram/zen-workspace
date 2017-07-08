import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import { colors } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';
import { addApp, selectApp } from '../actions/apps';
import AddWebApp from '../components/AddWebApp';
import Workspace from './Workspace';
import Settings from './Settings';
import Edit from './Edit';

const Container = glamorous.div({ width: '100%', height: '100%', display: 'flex' });
const BottomActions = glamorous.div({
  position: 'absolute',
  bottom: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const Dashboard = glamorous.div({
  height: '100%',
  padding: '1rem .5rem',
  backgroundColor: colors.blueGrey[900],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '75px',
  minWidth: '75px',
  boxShadow: 'inset -10px 0px 25px 0px rgba(0,0,0,.3)',
  zIndex: 10,
});

const Content = glamorous.div({
  height: '100%',
  backgroundColor: colors.blue[300],
  flex: 1,
  position: 'relative',
  zIndex: 0,
});

class Main extends Component {
  state = {};

  bringToFront = id => () => this.setState({ active: id });

  render = () =>
    (<Container>
      <Dashboard>
        <div>
          {this.props.apps.map(app =>
            (<div
              role="button"
              tabIndex={-1}
              key={`avatar_${app.id}`}
              onClick={() => this.props.selectApp(app.id)}
              onContextMenu={() => this.setState({ editApp: app })}
              style={{
                width: '50px',
                height: '50px',
                marginBottom: '.5rem',
                borderRadius: '50%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${app.meta && app.meta.image[0].url})`,
                backgroundColor: app.color,
                border: '3px solid white',
              }}
            />),
          )}
        </div>
        <BottomActions>
          <IconButton
            color="contrast"
            onClick={() => this.setState({ showSettings: !this.state.showSettings })}
          >
            <SettingsIcon />
          </IconButton>
          <AddWebApp onAdd={this.props.addApp} />
        </BottomActions>
      </Dashboard>
      <Content>
        <Workspace active={this.state.active} />
        {this.state.showSettings && <Settings />}
        {this.state.editApp &&
          <Edit app={this.state.editApp} onClose={() => this.setState({ editApp: undefined })} />}
      </Content>
    </Container>);
}

export default connect(
  ({ apps }) => ({ apps }),
  dispatch => ({
    selectApp: id => dispatch(selectApp(id)),
    addApp: url => dispatch(addApp(url)),
  }),
)(Main);

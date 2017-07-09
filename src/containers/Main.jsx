import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';
import { blueGrey, blue } from '../colors';
import { addApp, selectApp } from '../actions/apps';
import AddWebApp from '../components/AddWebApp';
import AppsMenu from '../components/AppsMenu';
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
  backgroundColor: blueGrey(900),
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
  backgroundColor: blue(300),
  flex: 1,
  position: 'relative',
  zIndex: 0,
});

class Main extends Component {
  state = {};

  render = () =>
    (<Container>
      <Dashboard>
        <AppsMenu
          apps={this.props.apps}
          onClick={app => this.props.selectApp(app.id)}
          onRightClick={app => this.setState({ editApp: app })}
        />
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
        <Workspace />
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

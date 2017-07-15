import React from 'react';
import { includes } from 'lodash';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import { blueGrey } from '../colors';
import { toggleExtension } from '../actions/extensions';

const Container = glamorous.div({
  position: 'absolute',
  top: 0,
  padding: '1rem',
  zIndex: '100',
  width: '100%',
  height: '100%',
  background: blueGrey(100),
});

const Settings = ({ extensions, toggle }) =>
  (<Container>
    <h1>Settings</h1>

    <List style={{ backgroundColor: 'white' }}>
      {extensions.list.map(manifest =>
        (<ListItem key={`list_${manifest.id}`}>
          <ListItemText primary={manifest.name} />
          <ListItemSecondaryAction>
            <Switch
              onChange={() => toggle(manifest.id)}
              checked={includes(extensions.enabled, manifest.id)}
            />
          </ListItemSecondaryAction>
        </ListItem>),
      )}
    </List>
  </Container>);

export default connect(
  ({ extensions }) => ({ extensions }),
  dispatch => ({
    toggle: id => dispatch(toggleExtension(id)),
  }),
)(Settings);

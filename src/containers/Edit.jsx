import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import TextField from 'material-ui/TextField';
import DeleteIcon from 'material-ui-icons/Delete';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { updateApp, removeApp } from '../actions/apps';
import { blueGrey } from '../colors';

const Container = glamorous.div({
  position: 'absolute',
  top: 0,
  padding: '1rem',
  zIndex: '100',
  width: '100%',
  height: '100%',
  background: blueGrey(100),
});

class Edit extends Component {
  state = {};
  render = () => {
    const { app, update, remove, onClose } = this.props;
    const data = { ...app, ...this.state };
    return (
      <Container>
        <Card>
          <CardContent>
            <div style={{ display: 'flex' }}>
              <Typography type="headline" component="h1" style={{ flex: 1 }}>
                Edit
              </Typography>

              <Button
                fab
                color="accent"
                onClick={() => {
                  remove(app.id);
                  onClose(app);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
            <TextField
              label="Color"
              fullWidth
              value={data.color}
              onChange={event => this.setState({ color: event.target.value })}
              marginForm
            />
            <TextField
              label="Url"
              fullWidth
              value={data.url}
              onChange={event => this.setState({ url: event.target.value })}
              marginForm
            />
            <TextField
              label="Badge"
              fullWidth
              value={(data.image && data.image[0]) || ''}
              onChange={event => this.setState({ image: [event.target.value] })}
              marginForm
            />
          </CardContent>
          <CardActions>
            <Button raised onClick={onClose}>
              Cancel
            </Button>

            <Button
              raised
              color="primary"
              onClick={() => {
                update({ ...app, ...this.state });
                onClose();
              }}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Container>
    );
  };
}

export default connect(undefined, dispatch => ({
  remove: app => dispatch(removeApp(app)),
  update: app => dispatch(updateApp(app.id, app)),
}))(Edit);

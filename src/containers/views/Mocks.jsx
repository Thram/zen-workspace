import React, { Component } from 'react';
import { getUsers, getPosts, getAlbums } from '../../api/mocks';
import { Group, ButtonGroup, Button } from '../../components/pure';

class Mocks extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.getUsers();
  }

  setData = data => this.setState({ data });

  getUsers = () => getUsers().then(this.setData);

  getPosts = () => getPosts().then(this.setData);

  getAlbums = () => getAlbums().then(this.setData);

  render = () => (
    <Group container>
      <Group container>
        <ButtonGroup>
          <Button onClick={this.getUsers}>Users</Button>
          <Button onClick={this.getPosts}>Posts</Button>
          <Button onClick={this.getAlbums}>Albums</Button>
        </ButtonGroup>
      </Group>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(this.state.data)}
      </pre>
    </Group>
  );
}

export default Mocks;

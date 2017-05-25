import React, { Component } from 'react';
import { getUsers, getPosts, getAlbums } from '../api/mocks';
import { Group, ButtonGroup, Button } from '../components/pure';

class Mocks extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.getUsers();
  }

  setData = (data = []) => this.setState({ data });

  getUsers = () => {
    this.setData();
    getUsers().then(this.setData);
  };

  getPosts = () => {
    this.setData();
    getPosts().then(this.setData);
  };

  getAlbums = () => {
    this.setData();
    getAlbums().then(this.setData);
  };

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
        {this.state.data.length > 0
          ? JSON.stringify(this.state.data)
          : 'Loading...'}
      </pre>
    </Group>
  );
}

export default Mocks;

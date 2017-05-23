import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import { Group, Input, Button, Form, ControlGroup } from '../components/pure';

class AddTodo extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    if (this.input.value.trim()) {
      const { dispatch } = this.props;
      dispatch(addTodo(this.input.value));
      this.input.value = '';
    }
  };
  setRef = (node) => {
    this.input = node && node.element;
  };

  render = () => (
    <Group container>
      <Form onSubmit={this.onSubmit} aligned>
        <ControlGroup>
          <Input ref={this.setRef} style={{ marginRight: '1rem' }} />
          <Button submit>Add Todo</Button>
        </ControlGroup>
      </Form>
    </Group>
  );
}

export default connect()(AddTodo);

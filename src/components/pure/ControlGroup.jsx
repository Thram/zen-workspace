/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ControlGroup as pControlGroup } from './Helpers';
import Element from './Element';

class ControlGroup extends Component {
  static propTypes = { className: PropTypes.string };
  static defaultProps = { className: '' };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => (
    <Element
      ref={this.setRef}
      {...this.props}
      className={`${pControlGroup} ${this.props.className}`}
    />
  );
}

export default ControlGroup;

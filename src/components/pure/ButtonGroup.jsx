/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ButtonGroup as pButtonGroup } from './Helpers';
import Element from './Element';

class ButtonGroup extends Component {
  static propTypes = { className: PropTypes.string };
  static defaultProps = { className: '' };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => (
    <Element
      ref={this.setRef}
      {...this.props}
      className={`${pButtonGroup} ${this.props.className}`}
    />
  );
}

export default ButtonGroup;

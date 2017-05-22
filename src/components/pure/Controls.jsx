/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Controls as pControls } from './Helpers';
import Element from './Element';

class Controls extends Component {
  static propTypes = { className: PropTypes.string };
  static defaultProps = { className: '' };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => (
    <Element
      ref={this.setRef}
      {...this.props}
      className={`${pControls} ${this.props.className}`}
    />
  );
}

export default Controls;

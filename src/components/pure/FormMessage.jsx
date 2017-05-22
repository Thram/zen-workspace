/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormMessage as pFormMessage } from './Helpers';
import Element from './Element';

class FormMessage extends Component {
  static propTypes = { className: PropTypes.string };
  static defaultProps = { className: '' };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => (
    <Element
      tag="span"
      ref={this.setRef}
      {...this.props}
      className={`${pFormMessage} ${this.props.className}`}
    />
  );
}

export default FormMessage;

/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit } from 'lodash';
import { Input as pInput } from './Helpers';
import Element from './Element';

class Input extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    rounded: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    size: undefined,
    rounded: false,
  };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => {
    const { size, rounded, className } = this.props;
    const baseClass = pInput({ fraction: size, rounded });
    return (
      <Element
        tag="input"
        ref={this.setRef}
        {...omit(this.props, ['className', 'size', 'rounded'])}
        className={`${baseClass} ${className}`}
      />
    );
  };
}

export default Input;

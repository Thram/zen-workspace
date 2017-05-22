/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit } from 'lodash';
import { InputUnit } from './Helpers';
import Element from './Element';

class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    size: undefined,
  };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => {
    const { size, className } = this.props;
    const baseClass = InputUnit(size);
    return (
      <Element
        tag="select"
        ref={this.setRef}
        {...omit(this.props, ['className', 'size'])}
        className={`${baseClass} ${className}`}
      />
    );
  };
}

export default Select;

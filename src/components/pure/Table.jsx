/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit } from 'lodash';
import { Table as pTable, Unit } from './Helpers';
import Element from './Element';

class Table extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    bordered: PropTypes.bool,
    horizontal: PropTypes.bool,
    striped: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    size: undefined,
    bordered: false,
    horizontal: false,
    striped: false,
  };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => {
    const { bordered, horizontal, striped, className, size } = this.props;
    const baseClass = pTable({ bordered, horizontal, striped });
    const sizeClass = size ? Unit({ fraction: size }) : '';

    return (
      <Element
        tag="table"
        ref={this.setRef}
        {...omit(this.props, [
          'className',
          'size',
          'bordered',
          'horizontal',
          'striped',
        ])}
        className={`${baseClass} ${sizeClass} ${className}`}
      />
    );
  };
}

export default Table;

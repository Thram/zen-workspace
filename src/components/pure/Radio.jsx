/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit, uniqueId } from 'lodash';
import { Radio as pRadio } from './Helpers';

class Radio extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    id: undefined,
    name: undefined,
    className: '',
    active: false,
    children: undefined,
  };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => {
    const { active, className, id, name } = this.props;
    const baseClass = pRadio({ active });
    const radioId = id || name || uniqueId('radio_');

    return (
      <label
        htmlFor={radioId}
        ref={this.setRef}
        className={`${baseClass} ${className}`}
      >
        <input
          name={radioId}
          type="radio"
          {...omit(this.props, ['className', 'active', 'children'])}
          checked={active}
        />
        {this.props.children}
      </label>
    );
  };
}

export default Radio;

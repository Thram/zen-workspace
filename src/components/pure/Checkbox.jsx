/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit, uniqueId } from 'lodash';
import { Checkbox as pCheckbox } from './Helpers';

class Checkbox extends Component {
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
    const baseClass = pCheckbox({ active });
    const checkBoxId = id || name || uniqueId('checkbox_');
    return (
      <label
        htmlFor={checkBoxId}
        ref={this.setRef}
        className={`${baseClass} ${className}`}
      >
        <input
          name={checkBoxId}
          type="checkbox"
          {...omit(this.props, ['className', 'active', 'children'])}
          checked={active}
        />
        {this.props.children}
      </label>
    );
  };
}

export default Checkbox;

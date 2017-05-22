/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit } from 'lodash';
import { Button as pButton, InputUnit } from './Helpers';
import Element from './Element';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    hover: PropTypes.bool,
    selected: PropTypes.bool,
    submit: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    size: undefined,
    type: undefined,
    active: false,
    disabled: false,
    hidden: false,
    hover: false,
    selected: false,
    submit: false,
  };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => {
    const {
      size,
      type,
      active,
      disabled,
      hidden,
      hover,
      selected,
      className,
      submit,
    } = this.props;
    const baseClass = pButton({
      type,
      active,
      disabled,
      hidden,
      hover,
      selected,
    });
    const sizeClass = InputUnit(size);

    return (
      <Element
        tag="button"
        type={submit ? 'submit' : 'button'}
        ref={this.setRef}
        {...omit(this.props, [
          'className',
          'size',
          'type',
          'active',
          'disabled',
          'hidden',
          'hover',
          'selected',
          'submit',
        ])}
        className={`${baseClass} ${sizeClass} ${className}`}
      />
    );
  };
}

export default Button;

/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit } from 'lodash';
import { Menu as pMenu } from './Helpers';
import Element from './Element';

class Menu extends Component {
  static propTypes = {
    className: PropTypes.string,
    horizontal: PropTypes.bool,
    fixed: PropTypes.bool,
    scrollable: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    horizontal: false,
    fixed: false,
    scrollable: false,
  };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => {
    const { horizontal, fixed, scrollable, className } = this.props;
    const baseClass = pMenu({ horizontal, fixed, scrollable });
    return (
      <Element
        ref={this.setRef}
        {...omit(this.props, [
          'className',
          'horizontal',
          'fixed',
          'scrollable',
        ])}
        className={`${baseClass} ${className}`}
      />
    );
  };
}

export default Menu;

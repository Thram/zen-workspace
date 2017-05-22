/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MenuSeparator as pMenuSeparator } from './Helpers';
import Element from './Element';

class MenuSeparator extends Component {
  static propTypes = { className: PropTypes.string };
  static defaultProps = { className: '' };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => (
    <Element
      tag="li"
      ref={this.setRef}
      {...this.props}
      className={`${pMenuSeparator} ${this.props.className}`}
    />
  );
}

export default MenuSeparator;

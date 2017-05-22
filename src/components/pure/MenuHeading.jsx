/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MenuHeading as pMenuHeading } from './Helpers';
import Element from './Element';

class MenuHeading extends Component {
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
      className={`${pMenuHeading} ${this.props.className}`}
    />
  );
}

export default MenuHeading;

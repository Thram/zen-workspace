/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit } from 'lodash';
import { MenuHeading as pMenuHeading, MenuLink as pMenuLink } from './Helpers';
import Element from './Element';

class MenuLink extends Component {
  static propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    action: PropTypes.func,
    heading: PropTypes.bool,
  };
  static defaultProps = {
    className: '',
    href: undefined,
    action: undefined,
    heading: false,
  };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => (
    <Element
      tag="a"
      ref={this.setRef}
      {...omit(this.props, ['heading', 'href', 'action'])}
      href={this.props.href}
      onClick={this.props.action}
      className={`${pMenuLink} ${this.props.heading ? pMenuHeading : ''} ${this.props.className}`}
    />
  );
}

export default MenuLink;

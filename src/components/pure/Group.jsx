/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit } from 'lodash';
import { css } from 'glamor';
import { Group as pGroup } from './Helpers';
import Cell from './Cell';
import Element from './Element';

class Group extends Component {
  static propTypes = {
    className: PropTypes.string,
    container: PropTypes.bool,
    fullHeight: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    className: '',
    container: false,
    fullHeight: false,
    children: undefined,
  };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  getChildren = () =>
    (this.props.container
      ? <Cell>{this.props.children}</Cell>
      : this.props.children);

  render = () => {
    const { fullHeight, className } = this.props;
    const heightClass = css({ height: fullHeight ? '100%' : 'auto' });
    return (
      <Element
        ref={this.setRef}
        {...omit(this.props, ['container', 'fullHeight', 'className'])}
        className={`${pGroup} ${heightClass} ${className}`}
      >
        {this.getChildren()}
      </Element>
    );
  };
}

export default Group;

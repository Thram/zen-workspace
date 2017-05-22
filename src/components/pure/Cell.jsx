/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { map, omit } from 'lodash';
import { css } from 'glamor';
import { Unit } from './Helpers';
import Element from './Element';

class Cell extends Component {
  static propTypes = {
    mediaQueries: PropTypes.shape({}),
    className: PropTypes.string,
    size: PropTypes.string,
    fullHeight: PropTypes.bool,
  };

  static defaultProps = {
    mediaQueries: {},
    className: '',
    size: undefined,
    fullHeight: false,
  };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => {
    const { size, mediaQueries, fullHeight, className } = this.props;
    const heightClass = css({ height: fullHeight ? '100%' : 'auto' });
    const baseClass = map({ base: size, ...mediaQueries }, (fraction, s) =>
      Unit({
        fraction,
        size: s,
      }),
    ).join(' ');
    return (
      <Element
        ref={this.setRef}
        {...omit(this.props, [
          'mediaQueries',
          'className',
          'size',
          'fullHeight',
        ])}
        className={`${baseClass} ${heightClass} ${className}`}
      />
    );
  };
}

export default Cell;

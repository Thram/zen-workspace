/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { HelpInline as pHelpInline } from './Helpers';
import Element from './Element';

class HelpInline extends Component {
  static propTypes = { className: PropTypes.string };
  static defaultProps = { className: '' };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => (
    <Element
      tag="aside"
      ref={this.setRef}
      {...this.props}
      className={`${pHelpInline} ${this.props.className}`}
    />
  );
}

export default HelpInline;

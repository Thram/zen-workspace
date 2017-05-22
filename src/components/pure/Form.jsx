/**
 * Created by thram on 6/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { omit } from 'lodash';
import { Form as pForm } from './Helpers';
import Element from './Element';

class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    stacked: PropTypes.bool,
    aligned: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    aligned: false,
    stacked: false,
  };

  setRef = (ref) => {
    this.element = ref && ref.element;
  };

  render = () => {
    const { stacked, aligned, className } = this.props;
    const baseClass = pForm({ stacked, aligned });
    return (
      <Element
        tag="form"
        ref={this.setRef}
        {...omit(this.props, ['className', 'stacked', 'aligned'])}
        className={`${baseClass} ${className}`}
      />
    );
  };
}

export default Form;

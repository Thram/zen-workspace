import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import Link from '../src/components/Link';

test('-- Components --', (mainAssert) => {
  mainAssert.test('<Link /> Inactive', (assert) => {
    const wrapper = shallow(<Link>Test</Link>);
    assert.equal(
      wrapper.html(),
      '<a role="button" tabindex="0">Test</a>',
      'Inactive link should render <a role="button" tabindex="0">{children}</a>',
    );
    assert.end();
  });

  mainAssert.test('<Link /> Active', (assert) => {
    const wrapper = shallow(<Link active>Test</Link>);
    assert.equal(
      wrapper.html(),
      '<span>Test</span>',
      'Active link should render <span>{children}</span>',
    );
    assert.end();
  });
  mainAssert.end();
});

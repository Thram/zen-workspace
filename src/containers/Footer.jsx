import React from 'react';
import FilterLink from './FilterLink';
import { Group, ButtonGroup } from '../components/pure';

const Footer = () => (
  <Group container>
    Show:
    <ButtonGroup>
      <FilterLink filter="SHOW_ALL" type="primary">
        All
      </FilterLink>
      <FilterLink filter="SHOW_ACTIVE" type="secondary">
        Active
      </FilterLink>
      <FilterLink filter="SHOW_COMPLETED" type="success">
        Completed
      </FilterLink>
    </ButtonGroup>
  </Group>
);

export default Footer;

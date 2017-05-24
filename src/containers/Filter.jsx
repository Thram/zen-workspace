import React from 'react';
import { Group, ButtonGroup } from '../components/pure';
import { FILTER_TYPES } from '../constants';
import FilterLink from './FilterLink';

const { all: ALL, active: ACTIVE, completed: COMPLETED } = FILTER_TYPES;

const Filter = () => (
  <Group container>
    Show:
    <ButtonGroup>
      <FilterLink filter={ALL} type="primary">
        All
      </FilterLink>
      <FilterLink filter={ACTIVE} type="secondary">
        Active
      </FilterLink>
      <FilterLink filter={COMPLETED} type="success">
        Completed
      </FilterLink>
    </ButtonGroup>
  </Group>
);

export default Filter;

/**
 * Created by thram on 6/04/17.
 */
import styles from './stylesheets/purecss.scss';

const WIDTHS = {
  full: '1',
  1: '1',
  '1-24': '1-24',
  '2-24': '2-24',
  '3-24': '3-24',
  '4-24': '4-24',
  '5-24': '5-24',
  '6-24': '6-24',
  '7-24': '7-24',
  '8-24': '8-24',
  '9-24': '9-24',
  '10-24': '10-24',
  '11-24': '11-24',
  '12-24': '12-24',
  '13-24': '13-24',
  '14-24': '14-24',
  '15-24': '15-24',
  '16-24': '16-24',
  '17-24': '17-24',
  '18-24': '18-24',
  '19-24': '19-24',
  '20-24': '20-24',
  '21-24': '21-24',
  '22-24': '22-24',
  '23-24': '23-24',
  '24-24': '1',
  '1-12': '2-24',
  '2-12': '4-24',
  '3-12': '6-24',
  '4-12': '8-24',
  '5-12': '10-24',
  '6-12': '12-24',
  '7-12': '14-24',
  '8-12': '16-24',
  '9-12': '18-24',
  '10-12': '20-24',
  '11-12': '22-24',
  '12-12': '1',
  '1-8': '3-24',
  '2-8': '6-24',
  '3-8': '9-24',
  '4-8': '12-24',
  '5-8': '15-24',
  '6-8': '18-24',
  '7-8': '21-24',
  '8-8': '1',
  '1-6': '4-24',
  '2-6': '8-24',
  '3-6': '12-24',
  '4-6': '16-24',
  '5-6': '20-24',
  '6-6': '1',
  '1-5': '1-5',
  '2-5': '2-5',
  '3-5': '3-5',
  '4-5': '4-5',
  '5-5': '24-24',
  '1-4': '6-24',
  '2-4': '12-24',
  '3-4': '18-24',
  '4-4': '24-24',
  '1-3': '8-24',
  '2-3': '16-24',
  '3-3': '1',
  '1-2': '12-24',
  '2-2': '1',
};

const SIZES = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl',
};

const pipe = (...functions) => data =>
  functions.reduce((value, func) => func(value), data);

const getClass = id => styles[id];

const unitClass = (base, fraction = '1', size) => {
  let className = base;
  if (SIZES[size]) className += `-${SIZES[size]}`;
  const normalized = fraction.split(/[/|-]/).join('-');
  const width = WIDTHS[normalized];
  return `${className}-${base === 'pure-u' ? WIDTHS[width] : normalized}`;
};

const Unit = (options = {}) =>
  getClass(unitClass('pure-u', options.fraction || WIDTHS.full, options.size));

const InputUnit = (fraction = WIDTHS.full) =>
  getClass(unitClass('pure-input', fraction));

const addClass = (condition, className) => value =>
  (condition ? [].concat(value, getClass(className)) : value);

const Hidden = getClass('hidden');

const OperaOnly = getClass('opera-only');

const buttonClass = 'pure-button';
const Button = ({ type, active, disabled, hidden, hover, selected }) =>
  pipe(
    addClass(true, `${buttonClass}`),
    addClass(type, `${buttonClass}-${type}`),
    addClass(active, `${buttonClass}-active`),
    addClass(disabled, `${buttonClass}-disabled`),
    addClass(hidden, `${buttonClass}-hidden`),
    addClass(hover, `${buttonClass}-hover`),
    addClass(selected, `${buttonClass}-selected`),
  )([]).join(' ');

const ButtonGroup = getClass('pure-button-group');

const checkboxClass = 'pure-checkbox';
const Checkbox = ({ active }) =>
  pipe(
    addClass(true, `${checkboxClass}`),
    addClass(active, `${checkboxClass}-active`),
  )([]).join(' ');

const radioClass = 'pure-radio';
const Radio = ({ active }) =>
  pipe(
    addClass(true, `${radioClass}`),
    addClass(active, `${radioClass}-active`),
  )([]).join(' ');

const ControlGroup = getClass('pure-control-group');

const Controls = getClass('pure-controls');

const formClass = 'pure-form';
const Form = ({ aligned, stacked }) =>
  pipe(
    addClass(true, `${formClass}`),
    addClass(aligned, `${formClass}-aligned`),
    addClass(stacked, `${formClass}-stacked`),
  )([]).join(' ');

const FormGroup = getClass('pure-group');

const FormMessage = getClass(`${formClass}-message`);

const FormMessageInline = getClass(`${formClass}-message-inline`);

const Group = getClass('pure-g');

const HelpInline = getClass('pure-help-inline');

const Image = getClass('pure-img');

const inputClass = 'pure-input';
const Input = ({ fraction, rounded }) =>
  pipe(
    addClass(true, `${inputClass}`),
    addClass(!!fraction, `${unitClass(inputClass, fraction)}`),
    addClass(rounded, 'pure-input-rounded'),
  )([]).join(' ');

const menuClass = 'pure-menu';
const Menu = ({ horizontal, fixed, scrollable }) =>
  pipe(
    addClass(true, `${menuClass}`),
    addClass(horizontal, `${menuClass}-horizontal`),
    addClass(fixed, `${menuClass}-fixed`),
    addClass(scrollable, `${menuClass}-scrollable`),
  )([]).join(' ');

const menuItemClass = 'pure-menu-item';
const MenuItem = ({ active, selected, disabled, hasChildren, allowHover }) =>
  pipe(
    addClass(true, `${menuItemClass}`),
    addClass(active, `${menuClass}-active`),
    addClass(selected, `${menuClass}-selected`),
    addClass(disabled, `${menuClass}-disabled`),
    addClass(hasChildren, `${menuClass}-has-children`),
    addClass(allowHover, `${menuClass}-allow-hover`),
  )([]).join(' ');

const MenuList = getClass('pure-menu-list');

const MenuChildren = getClass('pure-menu-children');

const MenuHeading = getClass('pure-menu-heading');

const MenuLink = getClass('pure-menu-link');

const MenuSeparator = getClass('pure-menu-separator');

const tableClass = 'pure-table';
const Table = ({ bordered, horizontal, striped }) =>
  pipe(
    addClass(true, `${tableClass}`),
    addClass(bordered, `${tableClass}-bordered`),
    addClass(horizontal, `${tableClass}-horizontal`),
    addClass(striped, `${tableClass}-striped`),
  )([]).join(' ');

const TableRowOdd = getClass('pure-table-odd');

export {
  Hidden,
  OperaOnly,
  Button,
  ButtonGroup,
  Checkbox,
  Radio,
  ControlGroup,
  Controls,
  Form,
  FormGroup,
  FormMessage,
  FormMessageInline,
  Group,
  HelpInline,
  Image,
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuChildren,
  MenuHeading,
  MenuLink,
  MenuSeparator,
  Table,
  TableRowOdd,
  Unit,
  InputUnit,
  WIDTHS,
  SIZES,
};

export default {
  Hidden,
  OperaOnly,
  Button,
  ButtonGroup,
  Checkbox,
  Radio,
  ControlGroup,
  Controls,
  Form,
  FormGroup,
  FormMessage,
  FormMessageInline,
  Group,
  HelpInline,
  Image,
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuChildren,
  MenuHeading,
  MenuLink,
  MenuSeparator,
  Table,
  TableRowOdd,
  Unit,
  InputUnit,
  WIDTHS,
  SIZES,
};

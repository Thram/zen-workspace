import { flow, sample } from 'lodash';
import { colors } from 'material-ui';
import { getRandomNumber } from './utils';

const getRandomScaleColor = getRandomNumber(100);

const getColor = color => scale => colors[color][scale];

const red = getColor('red');
const pink = getColor('pink');
const purple = getColor('purple');
const deepPurple = getColor('deepPurple');
const indigo = getColor('indigo');
const blue = getColor('blue');
const lightBlue = getColor('lightBlue');
const cyan = getColor('cyan');
const teal = getColor('teal');
const green = getColor('green');
const lightGreen = getColor('lightGreen');
const lime = getColor('lime');
const yellow = getColor('yellow');
const amber = getColor('amber');
const orange = getColor('orange');
const deepOrange = getColor('deepOrange');
const brown = getColor('brown');
const grey = getColor('grey');
const blueGrey = getColor('blueGrey');

const getRandomColor = () =>
  flow(
    () => Object.keys(colors),
    colorsNames => sample(colorsNames),
    selectedColor => colors[selectedColor][getRandomScaleColor()],
  )();

export {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
  getRandomNumber,
  getRandomColor,
  getColor,
};
export default {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
  getRandomNumber,
  getRandomColor,
  getColor,
};

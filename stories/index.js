import React from 'react';

import { storiesOf, setAddon } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { setOptions } from '@storybook/addon-options';
import infoAddon from '@storybook/addon-info';

setOptions({
  name: 'Starter Kit: React',
  url: 'https://github.com/TouchtechLtd/starter-kit-react',
  showLeftPanel: true,
  downPanelInRight: true,
});

setAddon(infoAddon);

storiesOf('Addons', module)
  .addDecorator(withKnobs)
  .addWithInfo(
    '• Info',
    "This is the basic usage of the `info addon`. Don't forget to define your `propTypes` .",
    () => <button onClick={action('Button Clicked')}>Click Me!</button>,
  )
  .add('• Knobs', () =>
    (<div
      style={object('style', {
        margin: '1rem',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        padding: '1rem',
        background: '#5CACC4',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
      })}
    >
      Edit my Styles!!
    </div>),
  );

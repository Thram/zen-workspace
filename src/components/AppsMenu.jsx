import React from 'react';
import { get } from 'lodash';
import glamorous from 'glamorous';
import { blue } from '../colors';

const Badge = glamorous.div(
  {
    width: '50px',
    height: '50px',
    marginBottom: '.5rem',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: '3px solid white',
  },
  ({ app }) => ({
    borderColor: app.selected ? blue(500) : 'white',
    backgroundImage: app.meta ? `url(${get(app, 'meta.image[0].url', '')})` : 'none',
    backgroundColor: app.color,
  }),
);

const AppsMenu = ({ apps, onClick, onRightClick }) =>
  (<div>
    {apps.map(app =>
      (<Badge
        app={app}
        key={`avatar_${app.id}`}
        onClick={() => onClick(app)}
        onContextMenu={() => onRightClick(app)}
      />),
    )}
  </div>);

export default AppsMenu;

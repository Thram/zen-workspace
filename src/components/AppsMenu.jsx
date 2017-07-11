import React from 'react';
import glamorous from 'glamorous';
import { blue } from '../colors';

const Badge = glamorous.div(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    marginBottom: '.5rem',
    borderRadius: '50%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: '3px solid white',
  },
  ({ app }) => ({
    borderColor: app.selected ? blue(500) : 'white',
    backgroundColor: app.color,
  }),
);

const AppsMenu = ({ apps, onClick, onRightClick }) =>
  (<div>
    {apps.map((app, index) =>
      (<Badge
        app={app}
        key={`avatar_${app.id}`}
        onClick={() => onClick(app)}
        onContextMenu={() => onRightClick(app)}
      >
        {app.badge ? <img src={app.badge} alt="Badge" /> : index}
      </Badge>),
    )}
  </div>);

export default AppsMenu;

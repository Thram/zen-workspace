import React from 'react';
import glamorous from 'glamorous';
import { blue } from '../colors';

const Avatar = glamorous.div(
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
    overflow: 'hidden',
  },
  ({ app }) => ({
    borderColor: app.selected ? blue(500) : 'white',
    backgroundColor: app.color,
  }),
);

const Icon = glamorous.img({ maxWidth: '100%', maxHeight: '100%' });

const AppsMenu = ({ apps, onClick, onRightClick }) =>
  (<div>
    {apps.map((app, index) =>
      (<Avatar
        app={app}
        key={`avatar_${app.id}`}
        onClick={() => onClick(app)}
        onContextMenu={() => onRightClick(app)}
      >
        {app.avatar ? <Icon src={app.avatar} alt="Avatar" /> : index}
      </Avatar>),
    )}
  </div>);

export default AppsMenu;

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

const Badge = glamorous.div(
  {
    position: 'absolute',
    borderRadius: '50%',
    transform: 'translateX(25%) translateY(-25%)',
    top: 0,
    right: 0,
    height: '1rem',
    width: '1rem',
  },
  ({ color }) => ({ backgroundColor: color || 'transparent' }),
);
const Icon = glamorous.img({ maxWidth: '100%', maxHeight: '100%' });

const AppsMenu = ({ apps, onClick, onRightClick }) =>
  (<div>
    {apps.map((app, index) =>
      (<div key={`avatar_${app.id}`} style={{ position: 'relative' }}>
        <Badge color={app.notifications && app.notifications.unread && 'red'}>
          {app.notifications && app.notifications.important ? '!' : ''}
        </Badge>
        <Avatar app={app} onClick={() => onClick(app)} onContextMenu={() => onRightClick(app)}>
          {app.avatar ? <Icon src={app.avatar} alt="Avatar" /> : index}
        </Avatar>
      </div>),
    )}
  </div>);

export default AppsMenu;

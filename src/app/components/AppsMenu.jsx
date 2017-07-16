import React from 'react';
import glamorous from 'glamorous';
import Chat from 'material-ui-icons/Chat';
import ChatBubble from 'material-ui-icons/ChatBubble';
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

const Badge = glamorous.div({
  position: 'absolute',
  transform: 'translateX(25%) translateY(-25%)',
  top: 0,
  right: '-5px',
});
const Icon = glamorous.img({ maxWidth: '100%', maxHeight: '100%' });

const renderStatus = (status = {}) =>
  status.unread &&
  <Badge>
    <ChatBubble
      style={{
        color: '#333',
        position: 'absolute',
        top: '1px',
        left: '1px',
        zIndex: -1,
      }}
    />
    {status.important
      ? <Chat style={{ color: '#D2374E' }} />
      : <ChatBubble style={{ color: '#AACBBE' }} />}
  </Badge>;

const AppsMenu = ({ apps, onClick, onRightClick }) =>
  (<div>
    {apps.map(app =>
      (<div key={`avatar_${app.id}`} style={{ position: 'relative' }}>
        {renderStatus(app.status)}
        <Avatar app={app} onClick={() => onClick(app)} onContextMenu={() => onRightClick(app)}>
          {app.avatar && <Icon src={app.avatar} alt="Avatar" />}
        </Avatar>
      </div>),
    )}
  </div>);

export default AppsMenu;

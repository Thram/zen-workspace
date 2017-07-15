// Catch Notifications
function setNotificationCallback(callback) {
  const OldNotify = window.Notification;

  function newNotify(title, opt) {
    return callback({
      name: title,
      options: opt,
    });
    // return new OldNotify(title, opt);
  }
  newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
  Object.defineProperty(newNotify, 'permission', {
    get: () => OldNotify.permission,
  });

  window.Notification = newNotify;
}

const message = type => data => ({
  type,
  meta: {
    id: WORKSPACE_APP_ID,
    name: WORKSPACE_APP_NAME,
    type: WORKSPACE_APP_TYPE,
  },
  payload: data,
});

const notification = message('NOTIFICATION');
const favicon = message('FAVICON');

const MESSENGER = {
  types: { notification, favicon },
  create: message,
  send: msg => electron.ipcRenderer.sendToHost(msg),
  hook: () => setNotificationCallback(data => MESSENGER.send(notification(data))),
};

window.MESSENGER = MESSENGER;

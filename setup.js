const { getBase64Image } = electron.remote.require('./webapps-tools');

// Fix problem with Extensions

chrome = {
  extension: {
    getURL: file => getBase64Image(file, 'extensions/**/'),
  },
};

// Messages Creators

const message = type => data =>
  Object.assign({ type, mate: { id: WORKSPACE_APP_ID, type: WORKSPACE_APP_TYPE } }, data);
const notification = message('NOTIFICATION');

// Catch Notifications
function setNotificationCallback(callback) {
  const OldNotify = window.Notification;
  function newNotify(title, opt) {
    callback({ name: title, options: opt });
    return new OldNotify(title, opt);
  }
  newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
  Object.defineProperty(newNotify, 'permission', {
    get: () => OldNotify.permission,
  });

  window.Notification = newNotify;
}

setNotificationCallback(data => electron.ipcRenderer.sendToHost(notification(data)));

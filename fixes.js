// Messages Creators

function sendNotification(data) {
  return Object.assign({ type: 'NOTIFICATION', id: WORKSPACE_APP_ID }, data);
}

// Fix problem with Extensions

chrome = { extension: { getURL: file => `./${file}` } };

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

setNotificationCallback(data => electron.ipcRenderer.sendToHost(sendNotification(data)));

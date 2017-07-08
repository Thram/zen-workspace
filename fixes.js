chrome = { extension: { getURL: file => `./${file}` } };
const setNotificationCallback = (callback) => {
  const OldNotify = window.Notification;
  const newNotify = (title, opt) => {
    callback({ name: title, options: opt });
    return new OldNotify(title, opt);
  };
  newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
  Object.defineProperty(newNotify, 'permission', {
    get: () => OldNotify.permission,
  });

  window.Notification = newNotify;
};

setNotificationCallback((data) => {
  const message = Object.assign({ type: 'NOTIFICATION', id: WORKSPACE_APP_ID }, data);
  electron.ipcRenderer.sendToHost(message);
});

const notification = Notification('I am Desktop Notification');

notification.onclick = () => {
  console.log('Click');
};

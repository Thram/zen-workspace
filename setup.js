const { getBase64Image } = electron.remote.require('./webapps-tools');

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Fix problem with Extensions

chrome = {
  extension: {
    getURL: file => getBase64Image(file, 'extensions/**/'),
  },
};

// Messages Creators
const message = type => data => ({
  type,
  meta: { id: WORKSPACE_APP_ID, type: WORKSPACE_APP_TYPE },
  payload: data,
});

const notification = message('NOTIFICATION');
const favicon = message('FAVICON');

// Messages Sender

const sendMessage = msg => electron.ipcRenderer.sendToHost(msg);

// Catch Notifications
function setNotificationCallback(callback) {
  const OldNotify = window.Notification;
  function newNotify(title, opt) {
    return callback({ name: title, options: opt });
    // return new OldNotify(title, opt);
  }
  newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
  Object.defineProperty(newNotify, 'permission', {
    get: () => OldNotify.permission,
  });

  window.Notification = newNotify;
}

setNotificationCallback(data => sendMessage(notification(data)));

// Favicon
const getFavicon = () => {
  const iconsSelector = 'link[rel=icon], link[rel="shortcut icon"],link[rel=apple-touch-icon]';
  const favicons = [].slice.call(document.head.querySelectorAll(iconsSelector));
  const checkSizes = (hq, icon) =>
    hq &&
    parseInt(hq.getAttribute('sizes') || 0, 10) > parseInt(icon.getAttribute('sizes') || 0, 10);
  const faviconLink = favicons.reduce((hq, link) => (checkSizes(hq, link) ? hq : link), undefined);
  return faviconLink ? faviconLink.getAttribute('href') : '';
};

pipe(getFavicon, imageURL => favicon({ url: imageURL }), sendMessage)();

console.log('Setup!');

// // Check for notifications

// // Inbox scrapper (If they have an * are because they are important)
// // [].slice.call(document.querySelectorAll('span.ss')).map(s=> s.getAttribute('jsinstance')

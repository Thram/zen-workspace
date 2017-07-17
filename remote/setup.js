const { getBase64Image } = electron.remote.require('./remote/tools');

// Fix problem with Extensions
chrome = {
  extension: {
    getURL: file => getBase64Image(file, 'extensions/**/'),
  },
};

MESSENGER.hook();

MESSENGER.send(MESSENGER.types.favicon({ url: SCRAPPERS.icon() }));

const scrapper = SCRAPPERS[WORKSPACE_APP_NAME];

if (scrapper) {
  let lastState = scrapper && scrapper();

  const notifyStatus = () => MESSENGER.send(MESSENGER.types.status(lastState));

  const unsubscribe = SCRAPPERS.observeDOM(() => {
    const currentState = scrapper();
    if (
      lastState.unread !== currentState.unread ||
      lastState.important !== currentState.important
    ) {
      lastState = currentState;
      notifyStatus();
    }
  });
  notifyStatus();
  window.onbeforeunload = () => unsubscribe();
}

// Check for notifications

// Inbox (inbox.google.com) scrapper (If they have an * are because they are important)
// [].slice.call(document.querySelectorAll('span.ss')).map(s=> s.getAttribute('jsinstance'))

// Google account email field (account.google.com)
// document.getElementById('Email').value = 'email@gmail.com'

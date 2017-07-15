const { getBase64Image } = electron.remote.require('./src/webapp/tools');

// Fix problem with Extensions
chrome = {
  extension: {
    getURL: file => getBase64Image(file, 'extensions/**/'),
  },
};

MESSENGER.hook();

MESSENGER.send(MESSENGER.types.favicon({ url: SCRAPPERS.icon() }));

console.log('Setup!', document.location.hostname);
console.log('Setup!', WORKSPACE_APP_ID, WORKSPACE_APP_NAME, WORKSPACE_APP_TYPE);
console.log('Setup!', SCRAPPERS[WORKSPACE_APP_NAME]());

MESSENGER.send(MESSENGER.types.notification(SCRAPPERS[WORKSPACE_APP_NAME]()));

// Check for notifications

// Inbox (inbox.google.com) scrapper (If they have an * are because they are important)
// [].slice.call(document.querySelectorAll('span.ss')).map(s=> s.getAttribute('jsinstance'))

// Google account email field (account.google.com)
// document.getElementById('Email').value = 'email@gmail.com'

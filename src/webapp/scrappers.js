const SCRAPPERS = {
  slack: () => {
    const unread = document.querySelectorAll('.channel.unread, .member.unread').length > 0;
    const important = document.querySelectorAll('.channel.mention, .member.mention').length > 0;
    return { unread, important };
  },
  inbox: () => {
    const unread = [].slice
      .call(document.querySelectorAll('span.ss'))
      .map(s => s.getAttribute('jsinstance'));

    return { unread: unread.length > 0, important: unread.join().indexOf('*') >= 0 };
  },
  icon: () => {
    const iconsSelector = 'link[rel=icon], link[rel="shortcut icon"],link[rel=apple-touch-icon]';
    const favicons = [].slice.call(document.head.querySelectorAll(iconsSelector));
    const getSize = iconLink => parseInt(iconLink.getAttribute('sizes') || 0, 10);
    const checkSizes = (hq, icon) => hq && getSize(hq) > getSize(icon);
    const reducer = (hq, link) => (checkSizes(hq, link) ? hq : link);
    const faviconLink = favicons.reduce(reducer, undefined);
    return faviconLink ? faviconLink.getAttribute('href') : '';
  },
  observeDOM: (callback) => {
    let DOM = '';
    const SECOND = 1000;
    const INTERVAL = 5 * SECOND; // Check at 60 frames per second
    const body = document.body;
    const check = () => {
      if (DOM !== body.innerHTML) {
        DOM = body.innerHTML;
        callback();
      }
    };

    const checker = setInterval(check, INTERVAL);
    const clear = () => clearInterval(checker);
    return clear;
  },
};

window.SCRAPPERS = SCRAPPERS;

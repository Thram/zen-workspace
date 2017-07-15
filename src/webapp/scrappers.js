const SCRAPPERS = {
  slack: () => ({}),
  trello: () => ({}),
  dropbox: () => ({}),
  github: () => ({}),
  medium: () => ({}),
  drive: () => ({}),
  inbox: () => {
    const unread = [].slice
      .call(document.querySelectorAll('span.ss'))
      .map(s => s.getAttribute('jsinstance'));

    return { unread: unread.length > 0, important: unread.join().indexOf('*') >= 0 };
  },
  calendar: () => ({}),
  icon: () => {
    const iconsSelector = 'link[rel=icon], link[rel="shortcut icon"],link[rel=apple-touch-icon]';
    const favicons = [].slice.call(document.head.querySelectorAll(iconsSelector));
    const getSize = iconLink => parseInt(iconLink.getAttribute('sizes') || 0, 10);
    const checkSizes = (hq, icon) => hq && getSize(hq) > getSize(icon);
    const reducer = (hq, link) => (checkSizes(hq, link) ? hq : link);
    const faviconLink = favicons.reduce(reducer, undefined);
    return faviconLink ? faviconLink.getAttribute('href') : '';
  },
};

window.SCRAPPERS = SCRAPPERS;

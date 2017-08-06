import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

let updater;
autoUpdater.autoDownload = false;
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.on('error', (event, error) =>
  dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString()),
);

autoUpdater.on('update-available', () =>
  dialog.showMessageBox(
    {
      type: 'info',
      title: 'Found Updates',
      message: 'Found updates, do you want update now?',
      buttons: ['Sure', 'No'],
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      } else {
        updater.enabled = true;
        updater = null;
      }
    },
  ),
);

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.',
  });
  updater.enabled = true;
  updater = null;
});

autoUpdater.on('update-downloaded', () =>
  dialog.showMessageBox(
    {
      title: 'Install Updates',
      message: 'Updates downloaded, application will be quit for update...',
    },
    () => {
      setImmediate(() => autoUpdater.quitAndInstall());
    },
  ),
);
autoUpdater.on('checking-for-update', () => log.info('Checking for update...'));
autoUpdater.on('download-progress', progressObj =>
  log.info(
    `- Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`,
  ),
);

// export this to MenuItem click callback
export default (menuItem) => {
  updater = menuItem;
  updater.enabled = false;
  autoUpdater.checkForUpdates();
};

import electron, { app, Menu, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import menuTemplate from './menu';

let mainWindow;

log.info('App starting...');

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: Math.round(width * 0.6),
    height: Math.round(height * 0.9),
    webSecurity: false,
  });
  if (process.env.NODE_ENV === 'development') mainWindow.webContents.openDevTools();

  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://0.0.0.0:8080'
      : `file://${__dirname}/release/index.html`;
  mainWindow.loadURL(url);
  mainWindow.on('closed', () => (mainWindow = null));

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
});

//-------------------------------------------------------------------
// Auto updates
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => sendStatusToWindow('Checking for update...'));
autoUpdater.on('update-available', (info) => {
  console.log(info);
  sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', (info) => {
  console.log(info);
  sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (err) => {
  console.log(err);
  sendStatusToWindow('Error in auto-updater.');
});
autoUpdater.on('download-progress', (progressObj) => {
  let logMessage = `Download speed: ${progressObj.bytesPerSecond}`;
  logMessage = `${logMessage} - Downloaded ${progressObj.percent}%`;
  logMessage = `${logMessage} (${progressObj.transferred}/${progressObj.total})`;
  sendStatusToWindow(logMessage);
});
autoUpdater.on('update-downloaded', (info) => {
  console.log(info);
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
});
autoUpdater.on('update-downloaded', () => autoUpdater.quitAndInstall());

app.on('ready', () => autoUpdater.checkForUpdates());

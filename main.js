import electron, { app, Menu, BrowserWindow } from 'electron';
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

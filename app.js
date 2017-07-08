import electron, { app, BrowserWindow } from 'electron';

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  let mainWindow = new BrowserWindow({
    width: Math.round(width * 0.6),
    height: Math.round(height * 0.9),
  });
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://0.0.0.0:8080'
      : `file://${__dirname}/dist/index.html`;
  mainWindow.loadURL(url);
  mainWindow.on('closed', () => (mainWindow = null));
});

import electron, { app, Menu, BrowserWindow } from 'electron';

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
    webSecurity: false,
  });
  if (process.env.NODE_ENV === 'development') mainWindow.webContents.openDevTools();

  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://0.0.0.0:8080'
      : `file://${__dirname}/release/index.html`;
  mainWindow.loadURL(url);
  mainWindow.on('closed', () => (mainWindow = null));

  // Create the Application's main menu
  const template = [
    {
      label: 'Application',
      submenu: [
        { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});

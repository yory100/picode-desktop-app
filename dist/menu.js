const { app, Menu, shell, BrowserWindow } = require('electron');
const isMac = process.platform === 'darwin';

const logoPath = __dirname + '/logo256.png';
const screenshotHTML = __dirname + '/screen-shot.html';

const Action = {
  label: 'Action',
  submenu: [
    {
      label: 'Run code',
      accelerator: 'CmdOrCtrl+Enter',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('run-code', 'run code')
      }
    },
    { type: 'separator' },
    {
      label: 'Take screenshot',
      accelerator: 'CmdOrCtrl+t',
      click: (menuItem, browserWindow, event) => {
        let screenShotWin = new BrowserWindow({
          width: 800, height: 600,
          webPreferences: { nodeIntegration: true },
          icon: logoPath
        });
        screenShotWin.loadFile(screenshotHTML);
        screenShotWin.show();
      }
    }
  ]
};

const FileManager = {
  label: 'File',
  submenu: [
    {
      label: 'Load file',
      accelerator: 'CmdOrCtrl+l',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('load-file', 'files')
      }
    },
    {
      label: 'Save',
      accelerator: 'CmdOrCtrl+s',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('save-file', 'files')
      }
    },
    {
      label: 'Save as..',
      accelerator: 'CmdOrCtrl+Shift+s',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('save-as-file', 'files')
      }
    },
    { type: 'separator' },
    isMac ? { role: 'close' } : { role: 'quit' }
  ]
};

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  FileManager,
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
    ]
  },
  Action,
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
          { role: 'close' }
        ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          await shell.openExternal('https://github.com/haikelfazzani')
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);

module.exports = menu;
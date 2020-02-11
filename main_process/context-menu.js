const contextMenu = require('electron-context-menu');

export default contextMenu({
  prepend: (defaultActions, params, browserWindow) => [
    {
      label: 'Run Code',
      accelerator: 'CmdOrCtrl+Enter',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('run-code', 'run code');
      }
    },
    { type: 'separator' },
    {
      label: 'New File',
      accelerator: 'CmdOrCtrl+n',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('new-file', 'new-file');
      }
    },
    { type: 'separator' },
    {
      label: 'Open File',
      accelerator: 'CmdOrCtrl+l',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('load-file', 'load-file');
      }
    },
    {
      label: 'Save',
      accelerator: 'CmdOrCtrl+s',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('save-file', 'save-file');
      }
    },
    {
      label: 'Save As..',
      accelerator: 'CmdOrCtrl+Shift+s',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('save-as-file', 'save-as-file');
      }
    }
  ]
});
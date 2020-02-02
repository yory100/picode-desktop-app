const contextMenu = require('electron-context-menu');

contextMenu({
  prepend: (defaultActions, params, browserWindow) => [
    {
      label: 'Run code', click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('run-code', 'run code')
      }
    },
    { type: 'separator' },
    {
      label: 'Live preview',
      type: 'checkbox',
      checked: false,
      click: (menuItem, browserWindow, event) => {
        menuItem.checked = true ? false : true;
        browserWindow.webContents.send('live-preview', menuItem.checked);        
      }
    },
    { type: 'separator' },
    {
      label: 'Load file', click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('load-file', 'files')
      }
    },
    {
      label: 'Save', click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('save-file', 'files')
      }
    },
    {
      label: 'Save as..', click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('save-as-file', 'files')
      }
    },
    { type: 'separator' }
  ]
});

module.exports = contextMenu;
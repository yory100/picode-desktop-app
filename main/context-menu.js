const contextMenu = require('electron-context-menu');
var isChecked = false;

contextMenu({
  prepend: (defaultActions, params, browserWindow) => [
    {
      label: 'Run code', 
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('run-code', 'run code')
      }
    },
    { type: 'separator' },
    {
      label: 'Live preview',
      type: 'checkbox',
      checked: isChecked,
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('live-preview', menuItem.checked);
        isChecked = !isChecked;
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
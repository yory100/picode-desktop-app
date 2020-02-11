const contextMenu = require('electron-context-menu');
var fs = require('fs');
const STORE_PATH = __dirname + '/store.json';

let jsonStore = fs.readFileSync(STORE_PATH, { encoding: 'UTF-8' });
var isChecked = JSON.parse(jsonStore)['live-preview'];

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
    },
    { type: 'separator' },
    {
      label: 'Live Preview',
      type: 'checkbox',
      accelerator: 'CmdOrCtrl+Shift+p',
      checked: isChecked,
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('live-preview', menuItem.checked);
        isChecked = !isChecked;
      }
    }
  ]
});
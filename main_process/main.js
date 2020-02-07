const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const menu = require(__dirname + '/menu');
const contextMenu = require(__dirname + '/context-menu');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    icon: __dirname + '/icons/logo256.png'
  });

  mainWindow.maximize();
  mainWindow.loadFile(__dirname + '/index.html');

  Menu.setApplicationMenu(menu);

  // try {
  //   require('electron-reloader')(module);
  // } catch (_) { }

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const menu = require(__dirname + '/main/menu');
const contextMenu = require(__dirname + '/main/context-menu');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    icon: __dirname + '/icons/logo192.png'
  });

  mainWindow.maximize();
  mainWindow.loadFile(__dirname + '/public/index.html');

  mainWindow.webContents.openDevTools();
  Menu.setApplicationMenu(menu);

  try {
    require('electron-reloader')(module);
  } catch (_) { }

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

module.exports = app;
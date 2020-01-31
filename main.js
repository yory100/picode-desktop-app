const { app, BrowserWindow, dialog, Menu } = require('electron');

const path = require('path');
const template = require('./menu');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true }
  });

  mainWindow.maximize();
  mainWindow.loadFile('index.html');

  mainWindow.webContents.openDevTools();

  const menu = Menu.buildFromTemplate(template(dialog,mainWindow));
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

module.exports = app;
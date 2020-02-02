const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true }
  });

  mainWindow.maximize();
  mainWindow.loadFile(__dirname+'/public/index.html');

  mainWindow.webContents.openDevTools();
  Menu.setApplicationMenu(null);

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
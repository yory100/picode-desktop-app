import JsonStore from "./JsonStore";
var path = require("path");
var fs = require('fs');

const setFileName = document.getElementById('file-name');

let currentFilePath = '';
let fileName = '';

export async function loadFile (dialog, myCodeMirror) {

  try {
    let result = await dialog.showOpenDialog();
    if (!result.canceled) {
      currentFilePath = result.filePaths[0];
      let fileContent = fs.readFileSync(currentFilePath, { encoding: 'UTF8' });
      myCodeMirror.setValue(fileContent);

      fileName = path.basename(currentFilePath);
      setFileName.textContent = fileName;
      JsonStore.pushOrUpdate("filename", fileName);
      JsonStore.pushOrUpdate("current-path", currentFilePath);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function saveAs (dialog, myCodeMirror) {
  try {
    let result = await dialog.showSaveDialog();
    
    if (!result.canceled) {
      currentFilePath = result.filePath;
      fs.writeFileSync(currentFilePath, myCodeMirror.getValue(), { encoding: 'UTF-8' });
      JsonStore.pushOrUpdate("current-path", currentFilePath);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function saveCurrent (dialog,myCodeMirror) {
  if (!result.canceled) {
    currentFilePath = JsonStore.get()["current-path"];
    fs.writeFileSync(currentFilePath, myCodeMirror.getValue(), { encoding: 'UTF-8', flag: 'w' });
    dialog.showMessageBox({
      message: 'The file has been saved!',
      buttons: ['OK']
    });
  }
}
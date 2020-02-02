import JsonStore from "./JsonStore";
var path = require("path");

const btnOpenFile = document.getElementById('open-file');
const btnSaveFile = document.getElementById('save-file');
const btnSaveAs = document.getElementById('save-as');
const setFileName = document.getElementById('file-name');

let currentFilePath = '';
let fileName = '';

export function openFile (dialog, fs, myCodeMirror) {

  btnOpenFile.addEventListener('click', async () => {
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
  });
}

export function saveAs (dialog, fs, myCodeMirror) {
  btnSaveAs.addEventListener('click', async () => {
    try {
      let result = await dialog.showOpenDialog();
      if (!result.canceled) {
        currentFilePath = result.filePaths[0];
        fs.writeFileSync(currentFilePath, myCodeMirror.getValue(), { encoding: 'UTF-8', flag: 'w' });
        
        JsonStore.pushOrUpdate("current-path", currentFilePath);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export function saveCurrent (fs, myCodeMirror) {
  btnSaveFile.addEventListener('click', () => {
    if (!result.canceled) {
      currentFilePath = JsonStore.get()["current-path"];
      fs.writeFileSync(currentFilePath, myCodeMirror.getValue(), { encoding: 'UTF-8', flag: 'w' });
    }
  });
}
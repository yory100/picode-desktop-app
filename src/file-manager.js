import JsonStore from "./JsonStore";
var path = require("path");
var fs = require('fs');

var fileNameHeader = document.getElementById('file-name');

let currentFilePath = '';
let fileName = '';


export async function loadFile (dialog, myCodeMirror, ulFilesEl) {
  try {
    let result = await dialog.showOpenDialog();
    if (!result.canceled) {

      currentFilePath = result.filePaths[0];
      fileName = path.basename(currentFilePath);
      setFileName(fileName);
      myCodeMirror.setValue(getFileContent(currentFilePath, fileName));

      addFileIntoSide(currentFilePath, fileName, ulFilesEl);
    }
  } catch (error) {
    console.log(error);
  }
}

function setFileName (fileName) {
  fileNameHeader.textContent = fileName;
}

export function getFileContent (FilePath, fileName) {
  setFileName(fileName);
  let fileContent = fs.readFileSync(FilePath, { encoding: 'UTF8' });
  JsonStore.pushOrUpdate("filename", fileName);
  JsonStore.pushOrUpdate("current-path", FilePath);
  return fileContent;
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

export async function saveCurrent (dialog, myCodeMirror) {
  if (!result.canceled) {
    currentFilePath = JsonStore.get()["current-path"];
    fs.writeFileSync(currentFilePath, myCodeMirror.getValue(), { encoding: 'UTF-8', flag: 'w' });
    dialog.showMessageBox({
      message: 'The file has been saved!',
      buttons: ['OK']
    });
  }
}

// add loaded files into the store and update list ui files (sidebar)
function addFileIntoSide (currentFilePath, fileName, ulFilesEl) {
  let listFiles = JsonStore.getPropVal('opened-files');
  if (!listFiles.some(f => f.fileName === fileName)) {
    listFiles.push({ fileName, currentFilePath });
    loadFilesIntoSide(ulFilesEl);
    JsonStore.pushOrUpdate('opened-files', listFiles);
  }
}

export function loadFilesIntoSide (ulFilesEl) {
  let listFiles = JsonStore.getPropVal('opened-files');
  if (ulFilesEl) {
    ulFilesEl.innerHTML = '';
    listFiles.forEach(file => {
      ulFilesEl.innerHTML += `<li class="p-10" data-id="${file.fileName}">
      📑 ${file.fileName}
    </li>`;
    });
  }
}
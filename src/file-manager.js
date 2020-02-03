import JsonStore from "./JsonStore";
var path = require("path");
var fs = require('fs');

let currentFilePath = '';
let fileName = '';
let openedFiles = [];

export async function loadFile (dialog, myCodeMirror, sideFilesEl) {

  try {
    let result = await dialog.showOpenDialog();
    if (!result.canceled) {

      currentFilePath = result.filePaths[0];
      fileName = path.basename(currentFilePath);
      setFileName(fileName);
      loadFileContent(currentFilePath, fileName, myCodeMirror);

      addFileIntoSide(currentFilePath, fileName, sideFilesEl);
    }
  } catch (error) {
    console.log(error);
  }
}

function setFileName(fileName) {
  const fileNameHeader = document.getElementById('file-name');
  fileName = path.basename(currentFilePath);
  fileNameHeader.textContent = fileName;
}

// load file content into editor: CodeMirror
export function loadFileContent (FilePath, fileName, myCodeMirror) {
  setFileName(fileName);
  let fileContent = fs.readFileSync(FilePath, { encoding: 'UTF8' });
  myCodeMirror.setValue(fileContent);
  JsonStore.pushOrUpdate("filename", fileName);
  JsonStore.pushOrUpdate("current-path", FilePath);
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

function addFileIntoSide (currentFilePath, fileName, sideFilesEl) {
  openedFiles = JsonStore.getPropVal('opened-files');
  if (!openedFiles.some(f => f.fileName === fileName)) {
    openedFiles.push({ fileName, currentFilePath });
    loadFilesIntoSide(sideFilesEl);
    JsonStore.pushOrUpdate('opened-files', openedFiles);
  }
}

export function loadFilesIntoSide (sideFilesEl) {
  let listFiles = JsonStore.getPropVal('opened-files');
  if (sideFilesEl) {
    sideFilesEl.innerHTML = '';
    listFiles.forEach(file => {
      sideFilesEl.innerHTML += `<li class="p-10" data-id="${file.fileName}">
    📁 ${file.fileName}
    </li>`;
    });
  }
}
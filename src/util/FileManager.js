import JsonStore from "./JsonStore";

const path = require("path");
const fs = require('fs');
const { dialog } = require('electron').remote;

const tempFilePath = __dirname + '/temp';
let currentFilePath = tempFilePath;

export async function loadFile () {

  let result = await dialog.showOpenDialog();
  let fileContent = '', fileName = '';
  currentFilePath = result.filePaths[0];

  if (!result.canceled) {
    fileName = path.basename(currentFilePath);
    fileContent = fs.readFileSync(currentFilePath, { encoding: 'UTF8' });
    updateFileInfos(currentFilePath, fileName, fileContent);
  }
  return { fileName, fileContent, filePath: currentFilePath };
}

export function updateFileInfos (filePath, fileName, fileContent) {
  JsonStore.pushOrUpdate("current-path", filePath);
  JsonStore.pushOrUpdate("filename", fileName);
  fs.writeFileSync(tempFilePath, fileContent, { encoding: 'UTF8' });
}

export async function saveAs (codeValue) {
  try {
    let result = await dialog.showSaveDialog();
    if (!result.canceled) {
      currentFilePath = result.filePath;
      fs.writeFileSync(currentFilePath, codeValue, { encoding: 'UTF8' });
      JsonStore.pushOrUpdate("filename", path.basename(currentFilePath));
      JsonStore.pushOrUpdate("current-path", currentFilePath);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function saveCurrent () {
  currentFilePath = JsonStore.get()["current-path"];
  let codeValue = fs.readFileSync(tempFilePath, { encoding: 'UTF8' });
  fs.writeFileSync(currentFilePath, codeValue, { encoding: 'UTF8', flag: 'w' });
  await dialog.showMessageBox({
    message: 'The file has been saved!',
    buttons: ['OK']
  });
}

// add loaded files into the store
export function updateFilesToStore (currentFilePath, fileName) {
  let listFiles = getFilesFromStore();
  if (!listFiles.some(f => f.fileName === fileName)) {
    listFiles.push({ fileName, currentFilePath });
    JsonStore.pushOrUpdate('files', listFiles);
  }
  return listFiles;
}

export function getFilesFromStore () {
  return JsonStore.getPropVal('files') || [];
}

// remove file ,update  store / side files (ui)
export function removeFileFromStore (filename) {
  let listFiles = getFilesFromStore();
  let tmp = [];
  tmp = listFiles.filter(f => f.fileName !== filename);
  JsonStore.pushOrUpdate('files', tmp);
  return tmp;
}
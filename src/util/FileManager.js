import JsonStore from "./JsonStore";

const path = require("path");
const fs = require('fs');
const { dialog } = require('electron').remote;

const TEMP_FILE = __dirname + '/store/temp';
let currentFilePath = TEMP_FILE;

const LANG_EXT = [
  { ext: '.js', lang: 'javascript' },
  { ext: '.ts', lang: 'typescript' },
  { ext: '.py', lang: 'python' },
  { ext: '.html', lang: 'html' }
];

export async function loadFile () {

  let result = await dialog.showOpenDialog();
  let fileContent = '',
    fileName = '',
    fileExtension = '';

  currentFilePath = result.filePaths[0];

  if (!result.canceled) {
    fileName = path.basename(currentFilePath);
    fileContent = fs.readFileSync(currentFilePath, { encoding: 'UTF8' });
    fileExtension = path.extname(fileName);
    updateFileInfos(currentFilePath, fileName, fileContent, fileExtension);
  }
  return { fileName, fileContent, filePath: currentFilePath };
}

export function updateFileInfos (filePath, fileName, fileContent, fileExtension) {
  let language = LANG_EXT.find(l => l.ext === fileExtension).lang;
  JsonStore.pushOrUpdate("current-path", filePath);
  JsonStore.pushOrUpdate("filename", fileName);
  JsonStore.pushOrUpdate("language", language);
  fs.writeFileSync(TEMP_FILE, fileContent, { encoding: 'UTF8' });
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
  let codeValue = fs.readFileSync(TEMP_FILE, { encoding: 'UTF8' });
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
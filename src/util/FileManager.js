import JsonStore from "./JsonStore";
import TempManager from "./TempManager";

const path = require("path");
const { dialog } = require('electron').remote;

let currentFilePath = __dirname + '/store/temp';

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
    fileContent = TempManager.readFileUsingPath(currentFilePath);

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
  TempManager.overrideFile('default', fileContent);
}

export async function saveAs () {
  try {
    let result = await dialog.showSaveDialog();
    if (!result.canceled) {
      currentFilePath = result.filePath;
      
      TempManager.readAndWriteFile(currentFilePath);

      JsonStore.pushOrUpdate("filename", path.basename(currentFilePath));
      JsonStore.pushOrUpdate("current-path", currentFilePath);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function saveCurrent () {
  currentFilePath = JsonStore.get()["current-path"];
  TempManager.readAndWriteFile(currentFilePath);
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
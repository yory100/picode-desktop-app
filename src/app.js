import CodeMirror from './lib/codemirror';
import autoClose from './lib/autoclose';
import modeJs from './lib/mode/javascript/javascript';

var fs = require('fs');
let { dialog } = require('electron').remote;
let { ipcRenderer } = require('electron');

import JsonStore from './JsonStore';
import runCode from './runcode';
import { loadFile, saveAs, saveCurrent, loadFilesIntoSide, getFileContent } from './file-manager';
import appFontSize from './fontsize';
import updateLivePreview from './live-preview';

window.addEventListener('load', () => {
  autoClose(CodeMirror);
  modeJs(CodeMirror);
  
  const editorEl = document.getElementById('editor');
  const tempFile = __dirname + '/log/temp';

  const myCodeMirror = CodeMirror(editorEl, {
    lineNumbers: true,
    value: fs.readFileSync(tempFile, 'utf8'),
    mode: "javascript",
    theme: 'monokai',
    lineWrapping: true,
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 2,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });

  var CodeMirrorValue = myCodeMirror.getValue();
  var livePreviewEl = document.getElementById('live-preview');

  myCodeMirror.on("change", function () {
    CodeMirrorValue = myCodeMirror.getValue();
    fs.writeFileSync(tempFile, CodeMirrorValue, { encoding: 'UTF8', flag: 'w' });
    if (updateLivePreview(livePreviewEl)) { runCode() }
  });

  // live preview
  updateLivePreview(livePreviewEl);

  /** language select */
  const selectlanguage = document.getElementById('language');
  selectlanguage.value = JsonStore.getPropVal('language');
  selectlanguage.addEventListener('change', (evt) => {
    JsonStore.pushOrUpdate('language', evt.target.value);
    selectlanguage.value = JsonStore.getPropVal('language');
  });  

  // font size update
  var codeMirrorElement = document.querySelector('.CodeMirror');
  var resultBoxElement = document.getElementById('result');
  appFontSize(codeMirrorElement,resultBoxElement);

  // run code
  ipcRenderer.on('run-code', () => { runCode(); });

  // side files
  var sideFilesEl = document.querySelector('.side-files');
  var sideFilesSpan = document.getElementById('open-close-side');

  var isSideFilesOpened = true;

  sideFilesSpan.addEventListener('click', () => {
    isSideFilesOpened = !isSideFilesOpened;
    sideFilesEl.style.left = isSideFilesOpened ? '0px' : '-185px';
  });

  var ulFilesEl = document.getElementById('list-files');
  loadFilesIntoSide(ulFilesEl);

  Array.from(ulFilesEl.children).forEach(el => {
    el.addEventListener('click', () => {
      let listFiles = JsonStore.getPropVal('opened-files');
      let filePath = listFiles.find(f => f.fileName === el.dataset.id).currentFilePath;
      myCodeMirror.setValue(getFileContent(filePath, el.dataset.id));
    });
  });


  // File management
  ipcRenderer.on('load-file', async () => { await loadFile(dialog, myCodeMirror, ulFilesEl); });
  ipcRenderer.on('save-file', async () => { await saveCurrent(dialog, myCodeMirror);; });
  ipcRenderer.on('save-as-file', async () => { await saveAs(dialog, myCodeMirror); });
})
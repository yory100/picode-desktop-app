import CodeMirror from './lib/codemirror';
import autoClose from './lib/autoclose';
import modeJs from './lib/mode/javascript/javascript';
import runCode from './runcode';

var fs = require('fs');
let { dialog } = require('electron').remote;
let { ipcRenderer } = require('electron');

import { loadFile, saveAs, saveCurrent } from './file-manager';
import JsonStore from './JsonStore';

(function () {
  autoClose(CodeMirror);
  modeJs(CodeMirror);

  const editorEl = document.getElementById('editor');
  const tempFile = __dirname + '/log/temp.js';

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
  myCodeMirror.on("change", function () {
    CodeMirrorValue = myCodeMirror.getValue();
    fs.writeFileSync(tempFile, CodeMirrorValue, { encoding: 'UTF8', flag: 'w' });
    if (livePreview) { runCode() }
  });

  /** navbar: checkbox - live preview/live code */
  var livePreview = JsonStore.getPropVal('live-preview') || false;

  ipcRenderer.on('live-preview', (channel, listener) => {
    livePreview = listener;
    JsonStore.pushOrUpdate('live-preview', livePreview);
    var chkLivePreview = document.getElementById('live-preview');
    chkLivePreview.classList.toggle('bg-green');
  });

  /** navbar: font size change */
  var codeMirrorElement = document.querySelector('.CodeMirror');
  var resultBoxElement = document.getElementById('result');

  var currFontSize = parseInt(JsonStore.getPropVal('font-size'), 10) || 16;
  codeMirrorElement.style.fontSize = currFontSize + 'px';
  resultBoxElement.style.fontSize = currFontSize + 'px';

  ipcRenderer.on('increase-font', async () => {
    currFontSize++;
    codeMirrorElement.style.fontSize = currFontSize + 'px';
    resultBoxElement.style.fontSize = currFontSize + 'px';
    JsonStore.pushOrUpdate('font-size', currFontSize);
  });

  ipcRenderer.on('decrease-font', async () => {
    currFontSize--;
    codeMirrorElement.style.fontSize = currFontSize + 'px';
    resultBoxElement.style.fontSize = currFontSize + 'px';
    JsonStore.pushOrUpdate('font-size', currFontSize);
  });
  // run code
  ipcRenderer.on('run-code', () => { runCode(); });

  // File management
  ipcRenderer.on('load-file', async () => { await loadFile(dialog, myCodeMirror); });

  ipcRenderer.on('save-file', async () => { await saveCurrent(dialog, myCodeMirror);; });

  ipcRenderer.on('save-as-file', async () => { await saveAs(dialog, myCodeMirror); });
})()
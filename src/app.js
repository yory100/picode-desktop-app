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

  /** navbar: checkbox */
  var livePreview = JsonStore.getPropVal('live-preview') || false;
  var chkLivePreview = document.getElementById('live-preview');
  chkLivePreview.checked = livePreview;

  chkLivePreview.addEventListener('change', (e) => {
    livePreview = !livePreview;
    JsonStore.pushOrUpdate('live-preview', livePreview);
    chkLivePreview.parentElement.classList.toggle('bg-green');
  });

  /** navbar: font size change */
  var codeMirrorElement = document.querySelector('.CodeMirror ');
  var fontSize = JsonStore.getPropVal('font-size') || "16px";
  codeMirrorElement.style.fontSize = fontSize;

  var selectFontSize = document.getElementById('fontsize');
  selectFontSize.value = fontSize;

  selectFontSize.addEventListener('change', (e) => {
    fontSize = (e.target.value);
    codeMirrorElement.style.fontSize = fontSize;
    JsonStore.pushOrUpdate('font-size', fontSize);
  });

  // File management
  ipcRenderer.on('load-file', async () => {
    await loadFile(dialog, myCodeMirror);
  });

  ipcRenderer.on('save-file', async () => {
    await saveCurrent(myCodeMirror);;
  });

  ipcRenderer.on('save-as-file', async () => {
    await saveAs(dialog, myCodeMirror);
  });
})()
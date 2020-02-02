import CodeMirror from './lib/codemirror';
import autoClose from './lib/autoclose';
import modeJs from './lib/mode/javascript/javascript';
import runCode from './runcode';

var fs = require('fs');
let { dialog } = require('electron').remote;

import { openFile, saveAs, saveCurrent } from './file-manager';

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
  });

  openFile(dialog, fs, myCodeMirror);
  saveAs(dialog, fs, myCodeMirror);
  saveCurrent(fs, myCodeMirror);
})()
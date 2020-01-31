import CodeMirror from './lib/codemirror';
import autoClose from './lib/autoclose';
import modeJs from './lib/mode/javascript/javascript';
import runCode from './runcode';

(function () {

  autoClose(CodeMirror);
  modeJs(CodeMirror);

  var editorEl = document.getElementById('editor');
  var btnRun = document.getElementById('btn-run');
  var fileDirectory = __dirname + '/log/output.js';

  var myCodeMirror = CodeMirror(editorEl, {
    lineNumbers: true,
    value: fs.readFileSync(fileDirectory, 'utf8'),
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
    fs.writeFileSync(fileDirectory, CodeMirrorValue, { encoding: 'UTF8', flag: 'w' });
  });

  btnRun.addEventListener('click', () => { runCode(fileDirectory) });

  fs.watchFile(__dirname + '/log/openedfile.js', (curr, prev) => {
    let fileContent = fs.readFileSync(__dirname + '/log/openedfile.js', { encoding: 'UTF8' });
    myCodeMirror.setValue(fileContent)
  });
})()
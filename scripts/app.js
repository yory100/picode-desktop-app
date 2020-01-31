import CodeMirror from './lib/codemirror';
import autoClose from './lib/autoclose';
import modeJs from './lib/mode/javascript/javascript';

(function () {

  autoClose(CodeMirror);
  modeJs(CodeMirror);
  var fileDirectory = __dirname + '/scripts/script.js';

  document.getElementById('btn-run').addEventListener('click', runCode);

  var myCodeMirror = CodeMirror(document.getElementById('editor'), {
    lineNumbers: true,
    value: fs.readFileSync(fileDirectory, 'utf8'),
    mode: "javascript",
    theme: 'monokai',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 2
  });

  var CodeMirrorValue = myCodeMirror.getValue();
  myCodeMirror.on("change", function () {
    CodeMirrorValue = myCodeMirror.getValue();
    fs.writeFileSync(fileDirectory, CodeMirrorValue, { encoding: 'UTF8', flag: 'w' });
  });

  function runCode () {
    var resultUl = document.getElementById('result');
    var output = '';
    var outputErr = '';
    const nodeRun = spawn('node', [fileDirectory]);

    nodeRun.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      output += data;
    });

    nodeRun.stderr.on('data', (data) => {
      //console.error(`stderr: ${data}`);
      //outputErr += data;
      resultUl.innerHTML += `<li>${data}</li>`;

    });

    nodeRun.on('close', (code) => {

      if (!outputErr && outputErr.length < 1) {
        resultUl.innerHTML = '';
        output = output.split(/\n|\r\n/).filter(v => v);

        for (let i = 0; i < output.length; i++) {
          const element = output[i];
          resultUl.innerHTML += `<li>${element}</li>`;
        }
      }

      //console.log(`child process exited with code ${code}`);
    });

  }

})()
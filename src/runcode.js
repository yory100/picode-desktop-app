const { spawn } = require('child_process');
const tempFileR = __dirname + '/log/temp.js';
const btnRun = document.getElementById('btn-run');

btnRun.addEventListener('click', () => { runCode() });

export default function runCode () {
  const resultUl = document.getElementById('result');
  var output = '';
  var outputErr = '';
  const nodeRun = spawn('node', [tempFileR]);

  nodeRun.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    output += data;
  });

  nodeRun.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    resultUl.innerHTML = '';
    outputErr += data;
    resultUl.innerHTML += `<li class="cl-red">${data}</li>`;
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

    console.log(`child process exited with code ${code}`);
  });
}
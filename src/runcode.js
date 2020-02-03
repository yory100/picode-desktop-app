import JsonStore from './JsonStore';

const { spawn } = require('child_process');
const tempFileP = __dirname + '/log/temp';
const btnRun = document.getElementById('btn-run');

btnRun.addEventListener('click', () => { runCode() });

export default function runCode () {
  const resultUl = document.getElementById('result');
  var output = '';
  var outputErr = '';

  let currLanguage = JsonStore.getPropVal('language');
  let nodeRun = spawn('node', [tempFileP]);

  switch (currLanguage) {
    case 'python':
      nodeRun = spawn('python', [tempFileP]);
      break;
  
    default:
      nodeRun = spawn('node', [tempFileP]);
      break;
  }

  nodeRun.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    output += data + '  ';
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
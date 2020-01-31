export default function runCode (fileDirectory) {
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
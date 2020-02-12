import JsonStore from './JsonStore';

const { execFile, exec } = require('child_process');
const path = require('path')

export default function runCode () {

  return new Promise((resolve, reject) => {

    let currLang = JsonStore.getPropVal('language');
    let currPath = JsonStore.getPropVal('current-path');

    switch (currLang) {
      case 'python':
        execFile('python', [currPath], (error, stdout, stderr) => {
          if (stderr) { reject(stderr); }
          else resolve(stdout);
        });
        break;

      case 'golang':
        exec('go run ' + currPath, (error, stdout, stderr) => {
          if (stderr) { reject(stderr); }
          else resolve(stdout);
        });
        break;

      case 'java':
        execFile('javac', [currPath], (errorrr, stdoutt, stderr) => {
          if (stderr && stderr.length > 1) {
            resolve(stderr);
          }
          else {
            let v = path.basename(currPath).split('.')[0];
            let k = currPath.slice(0, currPath.lastIndexOf('\\'));

            execFile('java', ['-cp', k, v], (error, stdout, stderr) => {
              if (stderr) { reject(stderr); }
              else resolve(stdout);
            });
          }
        });
        break;

      case 'javascript':
        execFile('node', [currPath], (error, stdout, stderr) => {
          if (stderr) { reject(stderr); }
          else resolve(stdout);
        });
        break;

      case 'typescript':
        exec('ts-node ' + currPath, (error, stdout, stderr) => {
          if (stderr) { reject(stderr); }
          else resolve(stdout);
        });
        break;

      default:
        resolve('..');
        reject('..');
        break;
    }
  });
}
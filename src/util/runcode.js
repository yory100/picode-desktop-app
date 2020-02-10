import JsonStore from './JsonStore';

const { execFile, exec } = require('child_process');

export default function runCode () {

  return new Promise((resolve, reject) => {

    let currLang = JsonStore.getPropVal('language');
    let currPath = JsonStore.getPropVal('current-path');

    switch (currLang) {
      case 'python':
        execFile('python', [currPath], (error, stdout, stderr) => {
          if (stderr) { reject(stderr); }
          resolve(stdout);
        });
        break;

      case 'javascript':
        execFile('node', [currPath], (error, stdout, stderr) => {
          if (stderr) { reject(stderr); }
          resolve(stdout);
        });
        break;

      case 'typescript':
        exec('ts-node ' + currPath, (error, stdout, stderr) => {
          if (stderr) { reject(stderr); }
          resolve(stdout);
        });
        break;

      default:
        resolve('..');
        reject('..');
        break;
    }
  });
}
import JsonStore from './JsonStore';

const execFile = require('child_process').execFile;

export default function runCode (codeValue) {

  return new Promise((resolve, reject) => {

    let currLang = JsonStore.getPropVal('language');

    switch (currLang) {
      case 'python':
        execFile('python', [codeValue], (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr.split(/\n|\r\n/).filter(v => v))
          }
          resolve(stdout.split(/\n|\r\n/).filter(v => v));
        });
        break;

      default:
        execFile('node', [codeValue], (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr.split(/\n|\r\n/).filter(v => v))
          }
          resolve(stdout.split(/\n|\r\n/).filter(v => v));
        });
        break;
    }
  })
}
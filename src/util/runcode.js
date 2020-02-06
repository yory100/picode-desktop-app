import JsonStore from './JsonStore';
import FileSys from './FileSys';

const { execFile, exec } = require('child_process');

export default function runCode (newValue) {

  return new Promise((resolve, reject) => {

    let currLang = JsonStore.getPropVal('language');

    switch (currLang) {
      case 'python':
        execFile('python', [FileSys.getDefaultFilePath()], (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr.split(/\n|\r\n/).filter(v => v))
          }
          resolve(stdout.split(/\n|\r\n/).filter(v => v));
        });
        break;

      case 'javascript':
        execFile('node', [FileSys.getDefaultFilePath()], (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr.split(/\n|\r\n/).filter(v => v))
          }
          resolve(stdout.split(/\n|\r\n/).filter(v => v));
        });
        break;

      case 'typescript':
        FileSys.overrideFile(FileSys.getTsFilePath(), newValue)
        exec('ts-node ' + FileSys.getTsFilePath(), (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr.split(/\n|\r\n/).filter(v => v))
          }
          resolve(stdout.split(/\n|\r\n/).filter(v => v));
        });
        break;

      default:
        resolve(['html']);
        reject(['html']);
        break;
    }
  })
}
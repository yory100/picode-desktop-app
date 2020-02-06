import JsonStore from './JsonStore';
import TempManager from './TempManager';

const { execFile, exec } = require('child_process');

export default function runCode (newValue) {

  return new Promise((resolve, reject) => {

    let currLang = JsonStore.getPropVal('language');

    switch (currLang) {
      case 'python':
        execFile('python', [TempManager.getDefaultFilePath()], (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr.split(/\n|\r\n/).filter(v => v))
          }
          resolve(stdout.split(/\n|\r\n/).filter(v => v));
        });
        break;

      case 'javascript':
        execFile('node', [TempManager.getDefaultFilePath()], (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr.split(/\n|\r\n/).filter(v => v))
          }
          resolve(stdout.split(/\n|\r\n/).filter(v => v));
        });
        break;

      case 'typescript':
        TempManager.overrideFile(TempManager.getTsFilePath(), newValue)
        exec('ts-node ' + TempManager.getTsFilePath(), (error, stdout, stderr) => {
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
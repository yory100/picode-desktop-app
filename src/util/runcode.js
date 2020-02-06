import JsonStore from './JsonStore';

const { execFile, exec } = require('child_process');
const path = require("path");
const fs = require('fs');

const TEMP_FILE_TS = path.join(__dirname, '/store/temp.ts');
const TEMP_FILE = path.join(__dirname, '/store/temp');

export default function runCode (newValue) {

  return new Promise((resolve, reject) => {

    let currLang = JsonStore.getPropVal('language');

    switch (currLang) {
      case 'python':
        execFile('python', [TEMP_FILE], (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr.split(/\n|\r\n/).filter(v => v))
          }
          resolve(stdout.split(/\n|\r\n/).filter(v => v));
        });
        break;

      case 'typescript':
        fs.writeFileSync(TEMP_FILE_TS, newValue, { flag: 'w' });
        exec('ts-node ' + TEMP_FILE_TS, (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr.split(/\n|\r\n/).filter(v => v))
          }
          resolve(stdout.split(/\n|\r\n/).filter(v => v));
        });
        break;

        case 'javascript':
        execFile('node', [TEMP_FILE], (error, stdout, stderr) => {
          if (stderr) {
            reject(stderr.split(/\n|\r\n/).filter(v => v))
          }
          resolve(stdout.split(/\n|\r\n/).filter(v => v));
        });
        break;

      default:
        resolve(newValue);
        reject(newValue);
        break;
    }
  })
}
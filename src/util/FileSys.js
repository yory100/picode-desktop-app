const path = require("path");
const fs = require('fs');

const TEMP_FILE_TS = path.join(__dirname, '/temp.ts');
const TEMP_FILE = path.join(__dirname, '/temp');

export default class FileSys {

  static readFile (flag) {
    let currPath = flag === 'default' ? TEMP_FILE : TEMP_FILE_TS;
    let res = '';
    if (fs.existsSync(currPath)) {
      res = fs.readFileSync(currPath, { encoding: 'utf8', flag: 'r' });
    }
    else {
      fs.writeFile(currPath, '', { encoding: 'utf8', flag: 'w+' }, (err, data) => { });
    }
    return res;
  }

  static async overrideFile (flag, newCodeValue) {
    let res = flag === 'default' ? TEMP_FILE : TEMP_FILE_TS;
    await fs.promises.writeFile(res, newCodeValue, { flag: 'w+' });
  }
  
  /** read , write */
  static writeFile (filePath, newCodeValue) {
    fs.writeFile(filePath, newCodeValue, { flag: 'w+' }, function (err) { });
  }

  static readFileUsingPath (filePath) {
    let res = '';
    if (fs.existsSync(filePath)) {
      res = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    }
    else {
      fs.writeFile(filePath, '', { encoding: 'utf8', flag: 'w+' }, (err, data) => { });
    }
    return res;
  }
  /** read and wite: file */
  static readAndWriteFile (filePath) {
    let res = '';
    if (fs.existsSync(TEMP_FILE)) {
      res = fs.readFileSync(TEMP_FILE, { encoding: 'utf8', flag: 'r' });
      fs.writeFile(filePath, res, { encoding: 'utf8', flag: 'w+' }, (err, data) => { });
    }
    else {
      fs.writeFile(filePath, '', { encoding: 'utf8', flag: 'w+' }, (err, data) => { });
    }
    return res;
  }

  static getTsFilePath () { return TEMP_FILE_TS; }
  static getDefaultFilePath () { return TEMP_FILE; }
}
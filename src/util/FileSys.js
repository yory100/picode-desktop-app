const path = require("path");
const fs = require('fs');

const TEMP_FILE_TS = path.join(__dirname, '/temp.ts');
const TEMP_FILE = path.join(__dirname, '/temp');

export default class FileSys {

  static readTempFile () {
    let res = '';
    if (fs.existsSync(TEMP_FILE)) {
      res = fs.readFileSync(TEMP_FILE, { encoding: 'utf8', flag: 'r' });
    }
    return res;
  }

  static async overrideTempFile (newCodeValue) {
    await fs.promises.writeFile(TEMP_FILE, newCodeValue, { flag: 'w+' });
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
import JsonStore from './JsonStore';
const exec = require('child_process').exec;

export default function RunCmd (packageName) {
  let currPath = JsonStore.getPropVal('current-path');
  let slicedPath = currPath.slice(0, currPath.lastIndexOf("\\"));

  return new Promise((resolve, reject) => {
    exec('npm install --prefix ' + slicedPath + ' ' +packageName, (error, stdout, stderr) => {     
      if (stderr) { reject(stderr); }
      else resolve('Package has been installed successfully');
    });
  })
}
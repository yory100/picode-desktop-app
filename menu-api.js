const fs = require('fs');

function openFile (dialog, mainWindow) {

  const options = {
    filtres: [{ name: 'js', extensions: ['js', 'ts'] },],
    properties: ['openFile']
  };

  dialog.showOpenDialog(mainWindow, options)
    .then(result => {
      // console.log(result.canceled)
      // console.log(result.filePaths)
      if (!result.canceled) {
        let fileContent = fs.readFileSync(result.filePaths[0], { encoding: 'UTF8' });
        fs.writeFileSync(__dirname + '/log/openedfile.js', fileContent);
      }
    }).catch(err => {
      console.log(err)
    })
}

module.exports = openFile;
const screenshot = require('screenshot-desktop');
const { remote } = require('electron');
const { dialog } = remote;

remote.getCurrentWindow().setMenu(null);

const fs = require('fs');

const btnCapture = document.getElementById('btn-capture');
const btnSave = document.getElementById('btn-save');
const imgContainer  = document.getElementById('img-container');
btnSave.disabled = true;

let imgData = '';

btnCapture.addEventListener('click', () => {
  remote.getCurrentWindow().hide();
  screenshot().then((img) => {
    imgData = img;
    let imgBase = ('data:image/png;base64,' + imgData.toString('base64'));
    imgContainer.innerHTML = `<img src="${imgBase}" alt="." id="img-capture" />`;
  }).catch((err) => { remote.getCurrentWindow().show(); });
  window.setTimeout(() => {
    remote.getCurrentWindow().show();
    btnSave.disabled = false;
  }, 1500);
});

btnSave.addEventListener('click', async () => {
  try {
    let result = await dialog.showSaveDialog();
    if (!result.canceled && imgData) {
      fs.writeFile(result.filePath, imgData, { encoding: 'binary' }, (err) => { })
    }
  } catch (error) { }
}, false)
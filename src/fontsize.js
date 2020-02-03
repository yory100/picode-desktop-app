import JsonStore from './JsonStore';
let { ipcRenderer } = require('electron');

var currFontSize = parseInt(JsonStore.getPropVal('font-size'), 10) || 16;

export default function appFontSize (codeMirrorElement, resultBoxElement) {

  codeMirrorElement.style.fontSize = currFontSize + 'px';
  resultBoxElement.style.fontSize = currFontSize + 'px';

  ipcRenderer.on('increase-font', async () => {
    currFontSize++;
    updateFontSize(currFontSize, codeMirrorElement, resultBoxElement);
  });

  ipcRenderer.on('decrease-font', async () => {
    currFontSize--;
    updateFontSize(currFontSize, codeMirrorElement, resultBoxElement);
  });

  function updateFontSize (newFontSize, codeMirrorElement, resultBoxElement) {
    codeMirrorElement.style.fontSize = newFontSize + 'px';
    resultBoxElement.style.fontSize = newFontSize + 'px';
    JsonStore.pushOrUpdate('font-size', newFontSize);
  }
}
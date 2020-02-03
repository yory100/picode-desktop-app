import JsonStore from './JsonStore';
let { ipcRenderer } = require('electron');

let livePreviewVal = JsonStore.getPropVal('live-preview') || false;

export default function updateLivePreview (livePreviewEl) {  
  livePreviewEl.style.backgroundColor = (livePreviewVal ? '#292' : '#a00000');
  
  ipcRenderer.on('live-preview', (channel, listener) => {
    livePreviewVal = listener;
    JsonStore.pushOrUpdate('live-preview', livePreviewVal);
    livePreviewEl.style.backgroundColor = (livePreviewVal ? '#292' : '#a00000');
  });
  return livePreviewVal;
}
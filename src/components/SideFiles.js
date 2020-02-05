import React from 'react';
import { loadFile, saveCurrent, updateFilesToStore, getFilesFromStore, updateFileInfos, removeFileFromStore } from '../util/FileManager';

const tempFilePath = __dirname + '/temp';
const fs = require('fs');
let { ipcRenderer } = require('electron');

export default function SideFiles ({ isSideFileClosed, setCodeVal }) {

  const [files, setFiles] = React.useState(getFilesFromStore());
  const [currFileName, setCurrFileName] = React.useState('');

  React.useEffect(() => {
    ipcRenderer.on('load-file', async () => {
      let { fileName, filePath, fileContent } = await loadFile();
      if (fileContent && fileContent.length > 15) {

        setCodeVal(fileContent);
        setCurrFileName(fileName);

        let rs = updateFilesToStore(filePath, fileName);
        setFiles([...rs]);
      }
    });

    ipcRenderer.on('save-file', async () => {
      await saveCurrent()
    });
  }, []);

  const getPath = (filePath, fileName) => {
    setCurrFileName(fileName);
    let fileContent = fs.readFileSync(filePath, { encoding: 'UTF8' });
    setCodeVal(fileContent);
    updateFileInfos(filePath, fileName, fileContent);
  }

  const removeFile = (fileName) => {
    let rs = removeFileFromStore(fileName);
    setFiles(rs);
  }

  return <div className="sidebar-files" style={{ marginLeft: isSideFileClosed ? '-16%' : '0%' }}>
    
    <ul>
      {files && Array.isArray(files) && files.map(f => {
        return f.fileName === currFileName ? <li key={f.fileName} className="disp-flex cl-green">
          <span onClick={() => { getPath(f.currentFilePath, f.fileName) }}>📑 {f.fileName}</span>
          <button onClick={() => { removeFile(f.fileName) }} className="btn-rm">x</button>
        </li> :
          (
            <li key={f.fileName} className="disp-flex">
              <span onClick={() => { getPath(f.currentFilePath, f.fileName) }}>📑 {f.fileName}</span>
              <button onClick={() => { removeFile(f.fileName) }} className="btn-rm">x</button>
            </li>
          )
      })}
    </ul>
  </div>;
}
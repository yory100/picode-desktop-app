import React from 'react';
import FileManager from '../util/FileManager';

const fs = require('fs');
let { ipcRenderer } = require('electron');

export default function SideFiles ({ setCodeVal, selectLang }) {

  const [files, setFiles] = React.useState(FileManager.getFilesFromStore());
  const [currFileName, setCurrFileName] = React.useState('');

  React.useEffect(() => {
    ipcRenderer.on('load-file', async () => {
      let { fileName, filePath, fileContent } = await FileManager.loadFile();
      if (fileContent) {

        setCodeVal(fileContent);
        setCurrFileName(fileName);

        selectLang(FileManager.getLangFromExt(fileName));

        let rs = FileManager.updateFilesToStore(filePath, fileName);
        setFiles([...rs]);
      }
    });
  }, []);

  const getPath = (filePath, fileName) => {
    setCurrFileName(fileName);
    let fileContent = fs.readFileSync(filePath, { encoding: 'UTF8' });
    setCodeVal(fileContent);

    selectLang(FileManager.getLangFromExt(fileName));
    FileManager.updateFileInfos(filePath, fileName, fileContent);
  }

  const removeFile = (fileName) => {
    let rs = FileManager.removeFileFromStore(fileName);
    setFiles(rs);
  }

  return <div className="sidebar-files">

    <div className="w-100 explorer disp-flex-sp">📁 Explorer</div>

    <ul className="w-100">
      {files && Array.isArray(files) && files.map(f =>
        <li key={f.fileName} className={f.fileName === currFileName ? "disp-flex-sp cl-yellow" : "disp-flex-sp"}>
          <span onClick={() => { getPath(f.currentFilePath, f.fileName) }}>📑 {f.fileName}</span>
          <button onClick={() => { removeFile(f.fileName) }} className="btn-rm">x</button>
        </li>
      )}
    </ul>

  </div>;
}
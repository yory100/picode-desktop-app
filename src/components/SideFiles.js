import React from 'react';
import { loadFile, saveCurrent, updateFilesToStore, getFilesFromStore, updateFileInfos, removeFileFromStore } from '../util/FileManager';

const fs = require('fs');
const path = require('path');
let { ipcRenderer } = require('electron');

const LANG_EXT = [
  { ext: '.js', lang: 'javascript' },
  { ext: '.ts', lang: 'typescript' },
  { ext: '.py', lang: 'python' },
  { ext: '.html', lang: 'html' }
];


export default function SideFiles ({ setIsSideFileClosed, isSideFileClosed, setCodeVal, selectLang }) {

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

    let fileExtension = path.extname(fileName);      
    let language = LANG_EXT.find(l => l.ext === fileExtension).lang;
    selectLang(language);

    updateFileInfos(filePath, fileName, fileContent, fileExtension);
  }

  const removeFile = (fileName) => {
    let rs = removeFileFromStore(fileName);
    setFiles(rs);
  }

  return <div className="sidebar-files" style={{ marginLeft: isSideFileClosed ? '-16%' : '0%' }}>

    <ul style={{ width: '95%' }}>
      {files && Array.isArray(files) && files.map(f =>
        <li key={f.fileName} className={f.fileName === currFileName ? "disp-flex cl-yellow" : "disp-flex"}>
          <span onClick={() => { getPath(f.currentFilePath, f.fileName) }}>📑 {f.fileName}</span>
          <button onClick={() => { removeFile(f.fileName) }} className="btn-rm">x</button>
        </li>
      )}
    </ul>

    <div className="close-side bg-dark" onClick={() => { setIsSideFileClosed(!isSideFileClosed) }}></div>
  </div>;
}
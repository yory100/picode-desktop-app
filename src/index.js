import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import "@babel/polyfill";

import runCode from './util/runcode';
import SideFiles from './components/SideFiles';
import { saveAs } from './util/FileManager';
import CodeEditor from './components/CodeEditor';
import CodeOutput from './components/CodeOutput';
import { getStoreFontSize, updateFontSize, getStoreLang, updateLang } from './util/LangFonSize';
import Footer from './components/Footer';

const fs = require('fs');
const path = require("path");
let { ipcRenderer } = require('electron');
const tempFilePath = __dirname + '/temp';

function App () {

  const [codeVal, setCodeVal] = React.useState();
  const [codeResult, setCodeResult] = React.useState([]);
  const [codeError, setCodeError] = React.useState([]);

  const [livePreview, setLivePreview] = React.useState(false);
  const [fontSize, setFontSize] = React.useState(getStoreFontSize());
  const [lang, setLang] = React.useState(getStoreLang());
  
  const [isSideFileClosed, setIsSideFileClosed] = React.useState(false);

  function onEditorChange (newValue) {
    setCodeVal(newValue);
    fs.writeFileSync(tempFilePath, newValue, { encoding: 'UTF8' });
    if (livePreview) {
      runCode(tempFilePath).then(result => {
        setCodeResult(result);
        setCodeError([]);
      })
        .catch(e => {
          setCodeError(e);
          setCodeResult([]);
        });
    }
  }

  React.useEffect(() => {
    let res = fs.readFileSync(tempFilePath, { encoding: 'UTF8' });
    setCodeVal(res);

    ipcRenderer.on('run-code', () => {
      setCodeVal(fs.readFileSync(tempFilePath, { encoding: 'UTF8' }));

      runCode(tempFilePath).then(result => {
        setCodeResult(result);
        setCodeError([]);
      })
        .catch(e => {
          setCodeError(e);
          setCodeResult([]);
        });
    });

    ipcRenderer.on('save-as-file', async () => {
      await saveAs(codeVal)
    });

    ipcRenderer.on('live-preview', async (channel, isChecked) => {
      setLivePreview(isChecked)
    });
  }, []);

  const updateFont = (e) => {
    setFontSize(+e.target.value);
    updateFontSize(+e.target.value);
  }

  const selectLang = (e) => {
    setLang(e.target.value);
    updateLang(e.target.value);
  }

  return (
    <>
      <div className="container">

        <SideFiles
          setIsSideFileClosed={setIsSideFileClosed}
          isSideFileClosed={isSideFileClosed}
          setCodeVal={setCodeVal}
        />

        <CodeEditor
          codeVal={codeVal}
          onChange={onEditorChange}
          fontSize={fontSize}
          mode={lang}
        />

        <CodeOutput
          codeError={codeError}
          codeResult={codeResult}
          isSideFileClosed={isSideFileClosed}
          fontSize={fontSize}
        />

      </div>

      <Footer
        updateFont={updateFont}
        selectLang={selectLang}
        lang={lang}
        fontSize={fontSize}
        livePreview={livePreview}
      />
    </>);
}

ReactDOM.render(<App />, document.getElementById('root'));
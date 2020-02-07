import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import "@babel/polyfill";

import runCode from './util/runcode';
import SideFiles from './components/SideFiles';
import FileManager from './util/FileManager';
import CodeEditor from './components/CodeEditor';
import CodeOutput from './components/CodeOutput';
import { getStoreFontSize, updateFontSize, getStoreLang, updateLang } from './util/LangFonSize';
import Footer from './components/Footer';
import FileSys from './util/FileSys';

let { ipcRenderer } = require('electron');

function App () {

  const [codeVal, setCodeVal] = useState();
  const [codeResult, setCodeResult] = useState('');
  const [codeError, setCodeError] = useState('');

  const [livePreview, setLivePreview] = useState(false);
  const [fontSize, setFontSize] = useState(getStoreFontSize());
  const [lang, setLang] = useState(getStoreLang());

  const [btnRunIsClicked, setBtnRunIsClicked] = useState(false);

  const [isSideFileClosed, setIsSideFileClosed] = useState(false);

  async function onEditorChange (newValue) {
    setCodeVal(newValue);
    await FileSys.overrideFile('default', newValue);
    if (livePreview) {
      runCode(newValue).then(result => {
        setCodeResult(result);
        setCodeError('');
      })
        .catch(e => {
          setCodeError(e);
          setCodeResult('');
        });
    }
  }

  React.useEffect(() => {
    let res = FileSys.readFile('default');
    setCodeVal(res);

    ipcRenderer.on('run-code', () => {
      setBtnRunIsClicked(true);
      let newValue = FileSys.readFile('default');
      setCodeVal(newValue);

      runCode(newValue).then(result => {
        setCodeResult(result);
        setCodeError('');
        if (result && result.length > 0) setBtnRunIsClicked(false);
      })
        .catch(e => {
          setCodeError(e);
          setCodeResult('');
          if (e && e.length > 0) setBtnRunIsClicked(false);
        });
    });

    ipcRenderer.on('save-as-file', async () => {
      await FileManager.saveAs();
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
    setLang(e);
    updateLang(e);
  }

  return (
    <>
      <div className="container">

        <SideFiles
          setIsSideFileClosed={setIsSideFileClosed}
          isSideFileClosed={isSideFileClosed}
          setCodeVal={setCodeVal}
          selectLang={selectLang}
        />

        <CodeEditor
          codeVal={codeVal}
          onChange={onEditorChange}
          fontSize={fontSize}
          mode={lang}
          nameId="ace-editor-col"
          showLineNumbers={true}
        />

        <CodeOutput
          codeError={codeError}
          codeResult={codeResult}
          isSideFileClosed={isSideFileClosed}
          fontSize={fontSize}
          language={lang}
          codeVal={codeVal}
        />

      </div>

      <Footer
        updateFont={updateFont}
        fontSize={fontSize}
        lang={lang}
        selectLang={selectLang}
        livePreview={livePreview}
        btnRunIsClicked={btnRunIsClicked}
      />
    </>);
}

ReactDOM.render(<App />, document.getElementById('root'));
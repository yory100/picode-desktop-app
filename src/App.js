import React, { useState } from 'react';

import runCode from './util/runcode';
import SideFiles from './components/SideFiles';
import FileManager from './util/FileManager';
import CodeEditor from './components/CodeEditor';
import CodeOutput from './components/CodeOutput';
import LangThemeFont from './util/LangFonSize';
import Footer from './components/Footer';
import FileSys from './util/FileSys';

let ipcRenderer = require('electron').ipcRenderer;

export default function App () {

  const [codeVal, setCodeVal] = useState(FileSys.readTempFile());
  const [codeResult, setCodeResult] = useState('');
  const [codeError, setCodeError] = useState('');

  const [livePreview, setLivePreview] = useState(false);
  const [fontSize, setFontSize] = useState(LangThemeFont.getStoreFontSize());
  const [lang, setLang] = useState(LangThemeFont.getStoreLang());
  const [theme, setTheme] = useState(LangThemeFont.getStoreTheme());

  const [btnRunIsClicked, setBtnRunIsClicked] = useState(false);

  const [isSideFileClosed, setIsSideFileClosed] = useState(false);

  async function onEditorChange (newValue) {
    setCodeVal(newValue);
    await FileSys.writeTempFile(newValue);
    if (livePreview) {
      runCode().then(result => {
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
    ipcRenderer.on('run-code', () => {
      setBtnRunIsClicked(true);

      runCode().then(result => {
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
    LangThemeFont.updateFontSize(+e.target.value);
  }

  const selectLang = (e) => {
    setLang(e);
    LangThemeFont.updateLang(e);
  }

  const changeTheme = (e) => {
    setTheme(e.target.value);
    LangThemeFont.updateTheme(e.target.value);
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
          theme={theme}
          nameId="ace-editor-col"
        />

        <CodeOutput
          codeError={codeError}
          codeResult={codeResult}
          isSideFileClosed={isSideFileClosed}
          fontSize={fontSize}
          language={lang}
          codeVal={codeVal}
          theme={theme}
          btnRunIsClicked={btnRunIsClicked}
        />

      </div>

      <Footer
        updateFont={updateFont}
        fontSize={fontSize}
        lang={lang}
        selectLang={selectLang}
        changeTheme={changeTheme}
        theme={theme}
        livePreview={livePreview}
      />
    </>);
}
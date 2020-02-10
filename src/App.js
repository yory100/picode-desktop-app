import React, { useState } from 'react';

import runCode from './util/runcode';
import SideFiles from './components/SideFiles';
import FileManager from './util/FileManager';
import CodeEditor from './components/CodeEditor';
import CodeOutput from './components/CodeOutput';
import LangThemeFont from './util/LangFonSize';
import Footer from './components/Footer';
import FileSys from './util/FileSys';
import js_beautify from 'js-beautify';

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

    ipcRenderer.on('new-file', async (channel) => {
      setCodeVal('');
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

  const formatCode = () => {
    if(codeVal && codeVal.length > 4) {
      if(lang === 'javascript' || lang === 'typescript' || lang === 'html' || lang === 'golang') {
        if(lang === 'html') {
          setCodeVal(js_beautify.html(codeVal));
        }
        else setCodeVal(js_beautify.js(codeVal, { indent_size: 2, space_in_empty_paren: true }));
      }
    }    
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
      >
        <div className="info-configs p-left">{lang}</div>
        <div className="info-configs p-left">{fontSize + 'px'}</div>
        <div className="info-configs p-left">{theme}</div>
        <div className="info-configs p-left btn-format" onClick={formatCode}>Format code</div>
      </Footer>
    </>);
}
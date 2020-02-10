import React from 'react';
import Iframe from 'react-iframe'
import htmlToURL from '../util/htmlToURL';
import CodeEditor from './CodeEditor';

export default function CodeOutput ({ codeError, codeResult, isSideFileClosed,
  fontSize, language, theme, codeVal, btnRunIsClicked }) {

  return <div className="code-result"
    style={{ width: !isSideFileClosed ? '23%' : '39%', fontSize: fontSize + 'px' }}>
    {language === 'html'
      ? <Iframe url={htmlToURL(codeVal)} />
      : btnRunIsClicked
        ? <p className="plr cl-green">Running code..</p>
        : <CodeEditor
          codeVal={codeResult && codeResult.length > 0 ? codeResult : codeError}
          fontSize={fontSize}
          theme={theme}
          mode="javascript"
          name="ace-editor-result"
        />
    }
  </div>;
}
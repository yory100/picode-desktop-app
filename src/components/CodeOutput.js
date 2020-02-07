import React from 'react';
import Iframe from 'react-iframe'
import htmlToURL from '../util/htmlToURL';
import CodeEditor from './CodeEditor';

const ExecCode = ({ codeError, codeResult, fontSize, mode }) => {
  return <CodeEditor
    codeVal={codeResult && codeResult.length > 0 ? codeResult : codeError}
    fontSize={fontSize}
    mode={mode}   
  />
}

export default function CodeOutput ({ codeError, codeResult, isSideFileClosed,
  fontSize, language, codeVal }) {

  return <div className="code-result"
    style={{ width: !isSideFileClosed ? '23%' : '39%', fontSize: fontSize + 'px' }}>
    {language === 'html'
      ? <Iframe url={htmlToURL(codeVal)} />
      : <ExecCode
        codeError={codeError}
        codeResult={codeResult}
        fontSize={fontSize}
        mode="javascript"
        name="ace-editor-result"
      />
    }
  </div>;
}
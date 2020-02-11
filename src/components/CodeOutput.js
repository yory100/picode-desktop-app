import React from 'react';
import Iframe from 'react-iframe'
import htmlToURL from '../util/htmlToURL';
import CodeEditor from './CodeEditor';
import Snackbar from './Snackbar';

export default function CodeOutput ({
  codeError, codeResult, fontSize, language, theme, codeVal, btnRunIsClicked
}) {

  return <div className="code-result">
    {language === 'html'
      ? <Iframe url={htmlToURL(codeVal)} />
      : <>
        <Snackbar msg="Running code.." show={btnRunIsClicked} position="snack-right " />
        <CodeEditor
          codeVal={codeResult && codeResult.length > 0 ? codeResult : codeError}
          fontSize={fontSize}
          theme={theme}
          mode="javascript"
          name="ace-editor-result"
        />
      </>
    }
  </div>;
}
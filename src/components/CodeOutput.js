import React from 'react';
import Iframe from 'react-iframe';
import htmlToURL from '../util/htmlToURL';
import CodeEditor from './CodeEditor';
import Snackbar from './Snackbar';
import marked from 'marked';

export default function CodeOutput ({
  codeError, codeResult, fontSize, language, theme, codeVal, btnRunIsClicked
}) {

  return <div className="code-result">
    {(language === 'html' || language === 'text')
      ? language === 'html'
        ? <Iframe url={htmlToURL(codeVal)} style={{height:'100%'}} />
        : <Iframe url={htmlToURL(marked(codeVal))} style={{color:'#fff',height:'100%'}} />
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
import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";

/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-language_tools";

export default function CodeEditor ({ codeVal, onChange, fontSize, mode, nameId }) {

  return <AceEditor
    mode={mode}
    theme="monokai"
    onChange={onChange}
    name={nameId}
    fontSize={fontSize}
    value={codeVal}
    showPrintMargin={false}
    showGutter={true}
    highlightActiveLine={true}
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      showLineNumbers: true,
      tabSize: 2,
      useWorker: false
    }}
  />;
}
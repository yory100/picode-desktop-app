import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-html";

/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-language_tools";

export default function CodeEditor ({ codeVal, onChange, fontSize, mode }) {

  return <AceEditor
    mode={mode}
    theme="monokai"
    onChange={onChange}
    name="ace-editor-col"
    fontSize={fontSize}
    value={codeVal}
    showPrintMargin={false}
    showGutter={true}
    highlightActiveLine={true}
    wrapEnabled={true}
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      showLineNumbers: true,
      tabSize: 2,
    }}
  />;
}
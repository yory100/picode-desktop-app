import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

export default function CodeEditor ({ codeVal, onChange, fontSize, mode }) {
  return <AceEditor
    mode={mode || "javascript"}
    theme="monokai"
    onChange={onChange}
    name="ace-editor-col"
    fontSize={fontSize || 14}
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
    }}
  />;
}
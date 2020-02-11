import React from 'react';
import Select from './Select';
import RunCommand from './RunCommand';
import FileManager from '../util/FileManager';

const FontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];
const Languages = ['text', 'html', 'javascript', 'python', 'typescript', 'golang'];
const themes = ['monokai', 'dracula', 'chaos'];

let { ipcRenderer } = require('electron');

export default function Footer ({
  children, updateFont, selectLang, changeTheme, livePreview
}) {

  const [showCmd, setShowCmd] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    ipcRenderer.on('save-file', async () => {
      let res = await FileManager.saveCurrent();
      setIsSaved(res);
      setTimeout(() => { setIsSaved(''); }, 5000);
    });
  }, []);

  return <>
    <RunCommand showCmd={showCmd} />
    <footer>
      <div className="disp-flex">
        <span className={livePreview ? "live-preview bg-green" : "live-preview bg-yellow"}></span>
        {children}
      </div>

      <div className="disp-flex">
        {isSaved && isSaved.length > 5 && <div className="info-configs p-left cl-yellow">{isSaved}</div>}
        <div onClick={() => { setShowCmd(!showCmd) }} className="info-configs p-left btn-format">NPM</div>
        <Select items={themes} onChange={changeTheme} />
        <Select items={FontSizes} onChange={updateFont} />
        <Select items={Languages} onChange={(e) => { selectLang(e.target.value) }} />
      </div>
    </footer>
  </>;
}
import React from 'react';
import Select from './Select';
import RunCommand from './RunCommand';

const FontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];
const Languages = ['text', 'html', 'javascript', 'python', 'typescript', 'golang'];
const themes = ['monokai', 'dracula', 'chaos'];

export default function Footer ({
  children, updateFont, selectLang, changeTheme, livePreview
}) {

  const [showCmd, setShowCmd] = React.useState(false);

  return <>
    <RunCommand showCmd={showCmd} />
    <footer>
      <div className="disp-flex">
        <div className="info-configs">
          <span className={livePreview ? "live-preview bg-green" : "live-preview bg-yellow"}></span>Live
      </div>
        {children}
      </div>

      <div className="disp-flex">
        <div onClick={() => { setShowCmd(!showCmd) }} className="info-configs p-left btn-format">NPM</div>
        <Select items={themes} onChange={changeTheme} />
        <Select items={FontSizes} onChange={updateFont} />
        <Select items={Languages} onChange={(e) => { selectLang(e.target.value) }} />
      </div>
    </footer>
  </>;
}
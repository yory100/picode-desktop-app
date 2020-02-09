import React from 'react';
import Select from './Select';

const FontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];
const Languages = ['html', 'javascript', 'python', 'typescript'];
const themes = ['monokai', 'dracula', 'solarized_dark'];

export default function Footer ({
  updateFont, fontSize, selectLang, lang, changeTheme, theme, livePreview, btnRunIsClicked
}) {
  return <footer>
    <div className="disp-flex">
      <div className="info-configs">
        <span className={livePreview ? "live-preview bg-green" : "live-preview bg-yellow"}></span>
        Live preview
      </div>
      <div className={btnRunIsClicked ? "info-configs bg-green p-left" : "info-configs p-left"}>{lang}</div>
      <div className="info-configs p-left">{fontSize + 'px'}</div>
      <div className="info-configs p-left">{theme}</div>
    </div>

    <div className="disp-flex">
      <Select items={themes} onChange={changeTheme} />
      <Select items={FontSizes} onChange={updateFont} />
      <Select items={Languages} onChange={(e) => { selectLang(e.target.value) }} />
    </div>
  </footer>;
}
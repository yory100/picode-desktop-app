import React from 'react';

const FontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];
const Languages = ['html', 'javascript', 'python', 'typescript'];

export default function Footer ({ updateFont, fontSize, selectLang, lang, livePreview, btnRunIsClicked }) {
  return <footer>
    <div className="disp-flex">
      <div className="info-configs">
        <span className={livePreview ? "live-preview bg-green" : "live-preview bg-yellow"}></span>
        Live preview
      </div>
      <div className={btnRunIsClicked ? "info-configs bg-green p-left" : "info-configs p-left"}>{lang}</div>
      <div className="info-configs p-left">{fontSize + 'px'}</div>
    </div>

    <div className="disp-flex">
      <select onChange={updateFont} >
        {FontSizes.map(fns => <option value={fns} key={fns}>{fns}</option>)}
      </select>

      <select onChange={(e) => { selectLang(e.target.value) }} >
        {Languages.map(lng => <option value={lng} key={lng}>{lng}</option>)}
      </select>
    </div>
  </footer>;
}
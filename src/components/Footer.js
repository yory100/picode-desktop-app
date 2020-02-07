import React from 'react';

const FontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];
const Languages = ['html', 'javascript', 'python', 'typescript'];

export default function Footer ({ updateFont, fontSize, selectLang, lang, livePreview, btnRunIsClicked }) {
  return <footer className="disp-flex">
    <div>
      <div>
        <span className={livePreview ? "live-preview bg-green plr" : "live-preview bg-yellow plr"}></span>
        Live preview
      </div>
      <div className={btnRunIsClicked ? "lang bg-green ml-20 plr" : "lang ml-20 plr"}>{lang}</div>
      <div className="plr">{fontSize + 'px'}</div>
    </div>

    <div>
      <select onChange={updateFont} className="plr">
        {FontSizes.map(fns => <option value={fns} key={fns}>{fns}</option>)}
      </select>

      <select onChange={(e) => { selectLang(e.target.value) }} className="plr">
        {Languages.map(lng => <option value={lng} key={lng}>{lng}</option>)}
      </select>
    </div>
  </footer>;
}
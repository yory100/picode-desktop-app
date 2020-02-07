import React from 'react';

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
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="22">22</option>
      </select>

      <select onChange={(e) => { selectLang(e.target.value) }} className="plr">
        <option value="html">html</option>
        <option value="javascript">javascript</option>
        <option value="python">python</option>
        <option value="typescript">typescript</option>
      </select>
    </div>
  </footer>;
}
import React from 'react';
import Iframe from 'react-iframe'
import htmlToURL from '../util/htmlToURL';

const ExecCode = ({ codeError, codeResult, btnRunIsClicked }) => {
  return <>
    {btnRunIsClicked && <p className="cl-green">Is running..</p>}
    {codeResult && codeResult.length > 0 && codeResult.map((v, i) => <p key={v + i}>{v}</p>)}
    {codeError && codeError.length > 0 && codeError.map((v, i) => <p key={v + i} className="cl-red">{v}</p>)}
  </>
}

export default function CodeOutput ({ codeError, codeResult, isSideFileClosed,
  fontSize, btnRunIsClicked, language, codeVal }) {

  return <div className="code-result"
    style={{ width: !isSideFileClosed ? '23%' : '39%', fontSize: fontSize + 'px' }}>
    {language === 'html'
      ? <Iframe url={htmlToURL(codeVal)}
        width="100%"
        height="100%"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative" />
      : <ExecCode
        codeError={codeError}
        codeResult={codeResult}
        btnRunIsClicked={btnRunIsClicked}
      />
    }
  </div>;
}
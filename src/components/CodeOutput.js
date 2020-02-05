import React from 'react';

export default function CodeOutput ({ codeError, codeResult, isSideFileClosed, fontSize }) {
  return <div className="code-result" 
  style={{ width: !isSideFileClosed ? '23%' : '39%', fontSize: fontSize + 'px' }}>
    
    {codeResult && codeResult.length > 0 && codeResult.map((v, i) => <p key={v + i}>{v}</p>)}
    {codeError && codeError.length > 0 && codeError.map((v, i) => <p key={v + i} className="cl-red">{v}</p>)}
  </div>;
}
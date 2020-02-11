import React from 'react';
import RunCmd from '../util/RunCmd';

export default function RunCommand ({ showCmd }) {

  const [packgeName, setPackageName] = React.useState('');
  const [result, setResult] = React.useState('');

  const run = () => {
    if (packgeName.length > 1) {
      RunCmd(packgeName)
        .then(r => {
          setResult(r);
          setPackageName('');
        })
        .catch(e => { setResult(e); })
    }
  }

  return (<div className="run-command w-25" style={{ display: showCmd ? 'block' : 'none' }}>
    <div className="disp-flex-sp">
      <input type="text" name="packgename"
        onChange={(e) => { setPackageName(e.target.value) }}
        value={packgeName}
        placeholder="Enter npm package name.."
        required
      />
      <button onClick={run}>Run</button>
    </div>
    {(result && result.length > 5) && <p>{result}</p> }
  </div>);
}
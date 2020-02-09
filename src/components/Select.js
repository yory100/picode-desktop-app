import React from 'react';

export default function Select ({ items, onChange }) {
  return <select onChange={onChange} >
    {items.map(item => <option value={item} key={item}>{item}</option>)}
  </select>;
}
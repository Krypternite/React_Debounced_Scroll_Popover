import React from 'react';
import names from './names';
import colors from './colors';

export default React.memo(function Col({ rowId }) {
  const td = names.map((name, i) => {
    const random = Math.floor(Math.random() * colors.length - 1);
    const color = colors[random];
    return (
      <td key={i}>
        <div id={`${i}-${name}-${rowId}`} className="cell" style={{ 'background-color': color }}></div>
      </td>
    );
  });
  return td;
});

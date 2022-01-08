import React, { useState, useRef } from 'react';
import names from './names';
import Row from './Row';
import debounce from 'lodash.debounce';

const Table = () => {
  const [isShown, setShown] = useState(null);
  const [pos, setPos] = useState(null);
  const clickID = useRef(null);
  const debouncedScroll = useRef(
    debounce((e) => {
      console.log(e);
      if (clickID.current) {
        const el = document.getElementById(clickID.current);
        if (el) {
          const { x, y } = el.getBoundingClientRect();
          if (x < 0 || y < 0) {
            setShown(false);
          } else if (x > 0 && y > 0) {
            setPos((prevPos) => ({
              ...prevPos,
              x: x + prevPos.diffX,
              y: y + prevPos.diffY,
            }));
            if (!isShown) {
              setShown(true);
            }
          }
        }
      }
    }, 1000)
  ).current;

  const onClick = (e) => {
    console.log(e);
    const id = e.target.id;
    if (isShown && clickID.current === id) {
      setShown(false);
      clickID.current = null;
    } else if (e.target.classList.contains('cell')) {
      console.log(popover);
      const x = e.pageX;
      const y = e.pageY;
      const targetPos = e.target.getBoundingClientRect();
      const diffX = x - targetPos.x;
      const diffY = y - targetPos.y;
      setPos({ x, y, diffX, diffY });
      setShown(true);
      clickID.current = id;
    } else {
      setShown(false);
      clickID.current = null;
    }
  };
  const popover = (
    <div className={`popover ${isShown ? 'shown' : ''} `} style={{ left: pos?.x, top: pos?.y }}>
      Hi I am a popover;
    </div>
  );
  return (
    <div style={{ display: 'flex', maxWidth: '100vw' }}>
      {popover}
      <table className="fixed-table">
        <thead>
          <tr>
            <th>User Names </th>
          </tr>
        </thead>
        <tbody>
          {names.map((name, i) => (
            <tr key={i}>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="unfixed-table" onScroll={debouncedScroll}>
        <table>
          <thead>
            <tr>
              {names.map((name, i) => (
                <th key={i}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody onClick={onClick}>
            <Row />
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;

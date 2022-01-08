import React from 'react';
import names from './names';
import Col from './Col';

export default React.memo(function Row() {
  return (
    <>
      {names.map((name, i) => (
        <tr key={i}>
          <Col rowId={name} />
        </tr>
      ))}
    </>
  );
});

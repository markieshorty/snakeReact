import React from 'react';

const Apple = (props) => {
  const apple = (
    <div
      className="apple"
      style={{ top: props.apple.y + 'px', left: props.apple.x + 'px' }}
    ></div>
  );
  return apple;
};

export default Apple;

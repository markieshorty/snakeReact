import React from 'react';

const Snake = (props) => {
  const snakeBody = props.snakePosition.body.map((bodyCell, index) => (
    <div
      key={index}
      className="snakeBodyCell"
      style={{ top: bodyCell.y + 'px', left: bodyCell.x + 'px' }}
    ></div>
  ));

  const snakeHead = (
    <div
      className="snakeHead"
      style={{
        top: props.snakePosition.y,
        left: props.snakePosition.x,
      }}
    ></div>
  );

  return (
    <>
      {snakeHead}
      {snakeBody}
    </>
  );
};

export default Snake;

import React, { useState, useEffect } from 'react';
// TODO split Game component into different components
// import StarsDisplay from './StarsDisplay';

const DIRECTIONS = () => {
  return {
    RIGHT: 'R',
    LEFT: 'L',
    UP: 'U',
    DOWN: 'D',
  };
};

const getArenaDimensions = () => {
  return {
    width: 200,
    height: 200,
  };
};

const getApple = () => {
  var apple = {
    x: randGen(0, getArenaDimensions().width - getSnakeWidth()),
    y: randGen(0, getArenaDimensions().height - getSnakeWidth()),
  };
  return apple;
};

const randGen = (min, max) => {
  return Math.floor(Math.random() * max + min);
};

const getSnakeWidth = () => {
  return 7;
};

const getDefaultSnakePosition = () => {
  const width = getSnakeWidth();

  return {
    x: 0,
    y: 100,
    body: [
      {
        x: -width,
        y: 100,
      },
      {
        x: -(width * 2),
        y: 100,
      },
      {
        x: -(width * 3),
        y: 100,
      },
      {
        x: -(width * 4),
        y: 100,
      },
      {
        x: -(width * 5),
        y: 100,
      },
    ],
  };
};

const useGameState = () => {
  // set initial states and expose set methods
  const [gameStarted, setGameStarted] = useState(true);
  const [directionOfTravel, setDirectionOfTravel] = useState(
    DIRECTIONS().RIGHT,
  );
  const [snakePosition, setSnakePosition] = useState(getDefaultSnakePosition());
  const [gameOver, setGameOver] = useState(false);
  const [apple, setApple] = useState({ x: 10, y: 10 });

  // like ngOnInit
  useEffect(() => {
    document.addEventListener(
      'keydown',
      (event) => {
        switch (event.key) {
          case 'ArrowDown': {
            var direction =
              directionOfTravel !== DIRECTIONS().UP
                ? DIRECTIONS().DOWN
                : DIRECTIONS().UP;
            setDirectionOfTravel(direction);
            break;
          }
          case 'ArrowUp': {
            var direction =
              directionOfTravel !== DIRECTIONS().DOWN
                ? DIRECTIONS().UP
                : DIRECTIONS().DOWN;
            setDirectionOfTravel(direction);
            break;
          }
          case 'ArrowRight': {
            var direction =
              directionOfTravel !== DIRECTIONS().LEFT
                ? DIRECTIONS().RIGHT
                : DIRECTIONS().LEFT;
            setDirectionOfTravel(direction);
            break;
          }
          case 'ArrowLeft': {
            var direction =
              directionOfTravel !== DIRECTIONS().RIGHT
                ? DIRECTIONS().LEFT
                : DIRECTIONS().RIGHT;
            setDirectionOfTravel(direction);
            break;
          }
        }
      },
      false,
    );

    if (gameStarted && !gameOver) {
      const timerId = setTimeout(
        () =>
          newAnimationFrame(
            gameStarted,
            directionOfTravel,
            snakePosition,
            gameOver,
            apple,
            setApple,
            setGameOver,
            setGameStarted,
            setSnakePosition,
          ),
        50,
      );
      return () => clearTimeout(timerId);
    }
  }, [snakePosition]);

  return {
    snakePosition,
    apple,
  };
};

const newAnimationFrame = (
  gameStarted,
  directionOfTravel,
  snakePosition,
  gameOver,
  apple,
  setApple,
  setGameOver,
  setGameStarted,
  setSnakePosition,
) => {
  let newSnakePosition = {};
  newSnakePosition.body = JSON.parse(JSON.stringify(snakePosition.body));

  if (directionOfTravel === DIRECTIONS().RIGHT) {
    newSnakePosition.x = snakePosition.x + getSnakeWidth();
    newSnakePosition.y = snakePosition.y;
  } else if (directionOfTravel === DIRECTIONS().DOWN) {
    newSnakePosition.x = snakePosition.x;
    newSnakePosition.y = snakePosition.y + getSnakeWidth();
  } else if (directionOfTravel === DIRECTIONS().UP) {
    newSnakePosition.x = snakePosition.x;
    newSnakePosition.y = snakePosition.y - getSnakeWidth();
  } else if (directionOfTravel === DIRECTIONS().LEFT) {
    newSnakePosition.x = snakePosition.x - getSnakeWidth();
    newSnakePosition.y = snakePosition.y;
  }

  let newApple = apple;
  let justAte = false;

  if (snakeEatingApple(newSnakePosition, apple)) {
    justAte = true;
    newApple = getApple();
  }

  let gameOverLocal = gameOver;
  let gameStartedLocal = gameStarted;
  if (
    newSnakePosition.x < 0 ||
    newSnakePosition.x > getArenaDimensions().width - getSnakeWidth() ||
    newSnakePosition.y < 0 ||
    newSnakePosition.y > getArenaDimensions().height - getSnakeWidth() ||
    snakeHitHimself(newSnakePosition)
  ) {
    gameOverLocal = true;
    gameStartedLocal = false;
  }

  newSnakePosition = updateBody(newSnakePosition, snakePosition, justAte);

  // update state vars
  setApple(newApple);
  setGameOver(gameOverLocal);
  setGameStarted(gameStartedLocal);
  setSnakePosition(newSnakePosition);
};

const Game = (props) => {
  const { snakePosition, apple } = useGameState();

  var headStyle = {
    top: snakePosition.y,
    left: snakePosition.x,
  };

  const snakeBody = snakePosition.body.map((bodyCell, index) => (
    <div
      key={index}
      className="snakeBodyCell"
      style={{ top: bodyCell.y + 'px', left: bodyCell.x + 'px' }}
    ></div>
  ));

  const currentApple = (
    <div
      className="apple"
      style={{ top: apple.y + 'px', left: apple.x + 'px' }}
    ></div>
  );

  return (
    <div className="arena">
      <div className="snakeHead" style={headStyle}></div>
      {snakeBody}
      {currentApple}
    </div>
  );
};

const updateBody = (newSnakePosition, snakePosition, justAte) => {
  // add item to front of array with old head position
  newSnakePosition.body.unshift({
    x: snakePosition.x,
    y: snakePosition.y,
  });
  // remove last item of the array
  if (!justAte) {
    newSnakePosition.body.pop();
  }

  return newSnakePosition;
};

const snakeHitHimself = (newSnakePosition) => {
  let result = false;
  newSnakePosition.body.forEach((bodyCell) => {
    let distanceX = Math.abs(newSnakePosition.x - bodyCell.x);
    let distanceY = Math.abs(newSnakePosition.y - bodyCell.y);

    if (distanceX < getSnakeWidth() && distanceY < getSnakeWidth()) {
      result = true;
    }
  });
  return result;
};

const snakeEatingApple = (snakeHeadPosition, apple) => {
  let distanceX = Math.abs(snakeHeadPosition.x - apple.x);
  let distanceY = Math.abs(snakeHeadPosition.y - apple.y);

  if (distanceX < getSnakeWidth() && distanceY < getSnakeWidth()) {
    return true;
  }

  return false;
};

export default Game;

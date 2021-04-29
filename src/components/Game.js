import React, { useState, useEffect } from 'react';
import Snake from './Snake';
import Apple from './Apple';
import { constants } from '../constants.js';
import { utils } from '../utils.js';

const Game = () => {
  const { snakePosition, apple } = useGameState();

  return (
    <div className="arena">
      <Apple apple={apple}></Apple>
      <Snake snakePosition={snakePosition}></Snake>
    </div>
  );
};

const useGameState = () => {
  // set initial states and expose set methods
  const [directionOfTravel, setDirectionOfTravel] = useState(
    constants.DIRECTIONS.RIGHT,
  );
  const [snakePosition, setSnakePosition] = useState(
    constants.DefaultSnakePosition,
  );
  const [gameOver, setGameOver] = useState(false);
  const [apple, setApple] = useState({ x: 10, y: 10 });

  useEffect(() => {
    document.addEventListener(
      'keydown',
      (event) => {
        switch (event.key) {
          case 'ArrowDown': {
            var direction =
              directionOfTravel !== constants.DIRECTIONS.UP
                ? constants.DIRECTIONS.DOWN
                : constants.DIRECTIONS.UP;
            setDirectionOfTravel(direction);
            break;
          }
          case 'ArrowUp': {
            var direction =
              directionOfTravel !== constants.DIRECTIONS.DOWN
                ? constants.DIRECTIONS.UP
                : constants.DIRECTIONS.DOWN;
            setDirectionOfTravel(direction);
            break;
          }
          case 'ArrowRight': {
            var direction =
              directionOfTravel !== constants.DIRECTIONS.LEFT
                ? constants.DIRECTIONS.RIGHT
                : constants.DIRECTIONS.LEFT;
            setDirectionOfTravel(direction);
            break;
          }
          case 'ArrowLeft': {
            var direction =
              directionOfTravel !== constants.DIRECTIONS.RIGHT
                ? constants.DIRECTIONS.LEFT
                : constants.DIRECTIONS.RIGHT;
            setDirectionOfTravel(direction);
            break;
          }
        }
      },
      false,
    );

    if (!gameOver) {
      const timerId = setTimeout(
        () =>
          newAnimationFrame(
            directionOfTravel,
            snakePosition,
            gameOver,
            apple,
            setApple,
            setGameOver,
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
  directionOfTravel,
  snakePosition,
  gameOver,
  apple,
  setApple,
  setGameOver,
  setSnakePosition,
) => {
  let newSnakePosition = {};
  // clone object
  newSnakePosition.body = JSON.parse(JSON.stringify(snakePosition.body));

  if (directionOfTravel === constants.DIRECTIONS.RIGHT) {
    newSnakePosition.x = snakePosition.x + constants.SnakeWidth;
    newSnakePosition.y = snakePosition.y;
  } else if (directionOfTravel === constants.DIRECTIONS.DOWN) {
    newSnakePosition.x = snakePosition.x;
    newSnakePosition.y = snakePosition.y + constants.SnakeWidth;
  } else if (directionOfTravel === constants.DIRECTIONS.UP) {
    newSnakePosition.x = snakePosition.x;
    newSnakePosition.y = snakePosition.y - constants.SnakeWidth;
  } else if (directionOfTravel === constants.DIRECTIONS.LEFT) {
    newSnakePosition.x = snakePosition.x - constants.SnakeWidth;
    newSnakePosition.y = snakePosition.y;
  }

  let newApple = apple;
  let justAte = false;

  if (utils.snakeEatingApple(newSnakePosition, apple)) {
    justAte = true;
    newApple = utils.getNewApple();
  }

  // GAME OVER IF SNAKE HITS EDGE OF CAGE OR HITS ITS OWN BODY
  gameOver =
    newSnakePosition.x < 0 ||
    newSnakePosition.x >
      constants.ArenaDimensions.width - constants.SnakeWidth ||
    newSnakePosition.y < 0 ||
    newSnakePosition.y >
      constants.ArenaDimensions.height - constants.SnakeWidth ||
    utils.snakeHitHimself(newSnakePosition);

  newSnakePosition = utils.calcNewSnakePosition(
    newSnakePosition,
    snakePosition,
    justAte,
  );

  // update state vars
  setApple(newApple);
  setGameOver(gameOver);
  setSnakePosition(newSnakePosition);
};

export default Game;

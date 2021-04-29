import { constants } from './constants.js';

export const utils = {
  getNewApple: () => {
    const randGen = (min, max) => {
      return Math.floor(Math.random() * max + min);
    };

    let apple = {
      x: randGen(0, constants.ArenaDimensions.width - 7),
      y: randGen(0, constants.ArenaDimensions.height - 7),
    };
    return apple;
  },

  calcNewSnakePosition: (newSnakePosition, snakePosition, justAte) => {
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
  },

  snakeHitHimself: (newSnakePosition) => {
    let result = false;
    newSnakePosition.body.forEach((bodyCell) => {
      let distanceX = Math.abs(newSnakePosition.x - bodyCell.x);
      let distanceY = Math.abs(newSnakePosition.y - bodyCell.y);

      if (
        distanceX < constants.SnakeWidth &&
        distanceY < constants.SnakeWidth
      ) {
        result = true;
      }
    });
    return result;
  },

  snakeEatingApple: (snakeHeadPosition, apple) => {
    let distanceX = Math.abs(snakeHeadPosition.x - apple.x);
    let distanceY = Math.abs(snakeHeadPosition.y - apple.y);

    if (distanceX < constants.SnakeWidth && distanceY < constants.SnakeWidth) {
      return true;
    }

    return false;
  },
};

export default utils;

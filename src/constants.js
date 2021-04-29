export const constants = {
  DIRECTIONS: {
    RIGHT: 'R',
    LEFT: 'L',
    UP: 'U',
    DOWN: 'D',
  },

  ArenaDimensions: {
    width: 200,
    height: 200,
  },

  SnakeWidth: 7,

  DefaultSnakePosition: {
    x: 0,
    y: 100,
    body: [
      {
        x: -7,
        y: 100,
      },
      {
        x: -(7 * 2),
        y: 100,
      },
      {
        x: -(7 * 3),
        y: 100,
      },
      {
        x: -(7 * 4),
        y: 100,
      },
      {
        x: -(7 * 5),
        y: 100,
      },
    ],
  },
};

export default constants;

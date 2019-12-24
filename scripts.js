(function () {
  const canvas = document.querySelector('#snake-canvas'),
        scoreElm = document.querySelector('#score'),
        contentElm = document.querySelector('#content'),
        upBtn = document.querySelector('#upBtn'),
        leftBtn = document.querySelector('#leftBtn'),
        rightBtn = document.querySelector('#rightBtn'),
        downBtn = document.querySelector('#downBtn'),
        ctx = canvas.getContext('2d'),
        gameW = 20,
        gameH = 20,
        snake = new Snake(gameW, gameH),
        defaultFillStyle = 'black',
        foodFillStyle = 'red',
        frameRate = 100, // in ms
        cellSize = 20;
  let directions = [],
      intervalID = null;

  canvas.width = gameW * cellSize;
  canvas.height = gameH * cellSize;
  contentElm.style.width = gameW * cellSize + 'px';

  canvas.addEventListener('click', e => {
    start();
  });

  const drawCell = (pos, fillStyle = defaultFillStyle) => {
    if (!pos) return;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(pos[1] * cellSize, pos[0] * cellSize, cellSize, cellSize);
  };

  const clearCell = cell => {
    ctx.clearRect(cell[1] * cellSize, cell[0] * cellSize, cellSize, cellSize);
  };

  const refresh = () => {
    if (directions.length > 0) {
      snake.direction = directions.shift();
    }
    const prevHead = snake.snakeBody[snake.snakeBody.length - 1];
    const prevtailTip = snake.snakeBody[0];
    const move = snake.move();
    if (move) {
      if (move.eatenCell) {
        clearCell(move.eatenCell);
        scoreElm.innerHTML = move.score;
      } else {
        clearCell(prevtailTip);
      }
      drawCell(snake.snakeBody[snake.snakeBody.length - 1]);
      drawCell(snake.foodPosition, foodFillStyle);
    } else {
      clearInterval(intervalID);
    }
  };

  drawCell(snake.snakeBody[snake.snakeBody.length - 1]);
  drawCell(snake.foodPosition, foodFillStyle);

  function start() {
    intervalID = setInterval(refresh, frameRate);
  }

  document.addEventListener('keydown', e => {
    const movesMap = {
      37: 'L',
      38: 'U',
      39: 'R',
      40: 'D',
    };
    if (movesMap[e.keyCode]) {
      directions.push(movesMap[e.keyCode]);
    }
  });

  upBtn.addEventListener('mousedown', () => { directions.push('U'); });
  leftBtn.addEventListener('mousedown', () => { directions.push('L'); });
  rightBtn.addEventListener('mousedown', () => { directions.push('R'); });
  downBtn.addEventListener('mousedown', () => { directions.push('D'); });
})();

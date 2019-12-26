(function () {
  const canvas = document.querySelector('#snake-canvas'),
        scoreElm = document.querySelector('#score'),
        contentElm = document.querySelector('#content'),
        upBtn = document.querySelector('#upBtn'),
        leftBtn = document.querySelector('#leftBtn'),
        rightBtn = document.querySelector('#rightBtn'),
        downBtn = document.querySelector('#downBtn'),
        resetBtn = document.querySelector('#reset-button'),
        speedControl = document.querySelector('#speed-control'),
        ctx = canvas.getContext('2d'),
        gameW = 20,
        gameH = 20,
        snake = new Snake(gameW, gameH),
        defaultFillStyle = 'black',
        foodFillStyle = 'red',
        cellSize = 20;
  let directions = [],
      frameRate = 100, // in ms
      intervalID = null;

  canvas.width = gameW * cellSize;
  canvas.height = gameH * cellSize;
  contentElm.style.width = gameW * cellSize + 'px';

  speedControl.value = (frameRate - 50) / 10;

  canvas.addEventListener('click', e => {
    start();
  });

  resetBtn.addEventListener('click', () => {
    reset();
    drawInitial();
  });

  speedControl.addEventListener('change', (e) => {
    frameRate = 160 - e.target.value * 10;
  });

  const drawCell = (pos, fillStyle = defaultFillStyle) => {
    if (!pos) return;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(pos[1] * cellSize, pos[0] * cellSize, cellSize, cellSize);
  };

  const clearCell = cell => {
    ctx.clearRect(cell[1] * cellSize, cell[0] * cellSize, cellSize, cellSize);
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, cellSize * gameW, cellSize * gameH);
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

  const drawInitial = () => {
    drawCell(snake.snakeBody[snake.snakeBody.length - 1]);
    drawCell(snake.foodPosition, foodFillStyle);
  };
  drawInitial();

  function start() {
    intervalID = setInterval(refresh, frameRate);
  }

  function pause() {
    clearInterval(intervalID);
  }

  function reset() {
    directions = [];
    clearInterval(intervalID);
    snake.reset();
    clearCanvas();
    drawCell(snake.snakeBody[snake.snakeBody.length - 1]);
    drawCell(snake.foodPosition, foodFillStyle);
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
    } else if (e.keyCode === 32) {
      pause();
    }
  });

  upBtn.addEventListener('mousedown', () => { directions.push('U'); });
  leftBtn.addEventListener('mousedown', () => { directions.push('L'); });
  rightBtn.addEventListener('mousedown', () => { directions.push('R'); });
  downBtn.addEventListener('mousedown', () => { directions.push('D'); });
})();

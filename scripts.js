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
        cellSide = 20;
  let directions = [],
      intervalID = null;

  canvas.width = gameW * cellSide;
  canvas.height = gameH * cellSide;
  contentElm.style.width = gameW * cellSide + 'px';

  canvas.addEventListener('click', e => {
    start();
  });

  const drawCell = (pos, fillStyle = defaultFillStyle) => {
    if (!pos) return;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(pos[1] * cellSide, pos[0] * cellSide, cellSide, cellSide);
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, gameW * cellSide, gameH * cellSide);
  };

  const drawCanvas = () => {
    snake.position.forEach(cell => {
      drawCell(cell);
    });

    drawCell(snake.foodPosition, foodFillStyle);
  };

  const refresh = () => {
    if (directions.length > 0) {
      snake.direction = directions.shift();
    }
    if (snake.move()) {
      clearCanvas();
      drawCanvas();
      scoreElm.innerHTML = snake.score;
    } else {
      clearInterval(intervalID);
    }
  };

  drawCanvas();

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

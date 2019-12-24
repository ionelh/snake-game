class Snake {
  #direction = 'R';
  #score = 0;
  #width = null;
  #height = null;
  #snakeBody = [[0,0]];
  #food = null;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#food = this.getRandomCell();
  }

  getRandomCell() {
    // cells "occupied" by the snake
    // track them so that we don't generate food on a cell on which the snake is
    const snakeCellsMap = {};
    this.#snakeBody.forEach(cell => {
      snakeCellsMap[cell[0] + '-' + cell[1]] = true;
    });
    let randomCell = [
      this.getRandomNumber(0, this.#height - 1),
      this.getRandomNumber(0, this.#width - 1),
    ];

    while (snakeCellsMap[randomCell[0] + '-' + randomCell[1]] === true) {
      randomCell = [
        this.getRandomNumber(0, this.#height - 1),
        this.getRandomNumber(0, this.#width - 1),
      ];
    }

    return randomCell;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  get snakeBody() {
    return this.#snakeBody;
  }

  set direction(direction) {
    if (this.movePossible(direction)) this.#direction = direction;
  }

  get foodPosition() {
    return this.#food;
  }

  move(direction) {
    const eatenCell = this.updateSnakeBody(this.#direction);
    if (this.isOutOfBounds()) return false;
    if (this.isBodyCollision()) return false;
    this.updateScore();
    return {
      eatenCell,
      score: this.#score,
    };
  }

  movePossible(direction) {
    if (this.#direction === 'L' && direction === 'R') return false;
    if (this.#direction === 'R' && direction === 'L') return false;
    if (this.#direction === 'U' && direction === 'D') return false;
    if (this.#direction === 'D' && direction === 'U') return false;

    return true;
  }

  isOutOfBounds(pos, w, h) {
      const head = this.getHead();
      return head[0] < 0 || head[0] > this.#height - 1 || head[1] < 0 || head[1] > this.#width - 1;
  }

  updateScore() {
      if (this.hasFood(this.getHead())) {
          this.#score += 1;
          this.#food = this.getRandomCell();
      }
  }

  getHead() {
      return this.#snakeBody[this.#snakeBody.length - 1];
  }

  isBodyCollision() {
      const head = this.getHead();
      for (let i = 0; i < this.#snakeBody.length - 1; i += 1) {
          if (head[0] === this.#snakeBody[i][0] && head[1] === this.#snakeBody[i][1]) return true;
      }
      return false;
  }

  // if it ate a cell after the move, returns the eaten cell. null otherwise
  updateSnakeBody(direction) {
      const nextCell = [...this.#snakeBody[this.#snakeBody.length - 1]];

      if (direction === 'D') {
          nextCell[0] += 1;
      } else if (direction === 'R') {
          nextCell[1] += 1;
      } else if (direction === 'U') {
          nextCell[0] -= 1;
      } else if (direction === 'L') {
          nextCell[1] -= 1;
      }
      this.#direction = direction;

      this.#snakeBody.push(nextCell);

      if (!this.hasFood(nextCell)) {
        this.#snakeBody.shift();
        return null;
      }
      return nextCell;
  }

  hasFood(cell) {
      return cell[0] === this.#food[0] && cell[1] === this.#food[1];
  }
}

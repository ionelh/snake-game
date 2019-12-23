class Snake {
  #direction = 'R';
  #score = 0;
  #width = null;
  #height = null;
  #position = [[0,0]];
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
    this.#position.forEach(cell => {
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

  get position() {
    return this.#position;
  }

  get score() {
    return this.#score;
  }

  set direction(direction) {
    if (this.movePossible(direction)) this.#direction = direction;
  }

  get foodPosition() {
    return this.#food;
  }

  move(direction) {
    this.updatePosition(this.#direction);
    if (this.isOutOfBounds()) return false;
    if (this.isBodyCollision()) return false;
    this.updateScore();
    return true;
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
      return this.#position[this.#position.length - 1];
  }

  isBodyCollision() {
      const head = this.getHead();
      for (let i = 0; i < this.#position.length - 1; i += 1) {
          if (head[0] === this.#position[i][0] && head[1] === this.#position[i][1]) return true;
      }
      return false;
  }

  updatePosition(direction) {
      const nextCell = [...this.#position[this.#position.length - 1]];

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

      this.#position.push(nextCell);

      if (!this.hasFood(nextCell)) this.#position.shift();
  }

  hasFood(cell) {
      return cell[0] === this.#food[0] && cell[1] === this.#food[1];
  }
}

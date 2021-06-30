class Rover {
  constructor(x, y, direction, plateau) {
    const plateauY = plateau[1]
    this.direction = direction
    this.x = x
    this.y = plateauY - y
    this.cardinals = ['N', 'E', 'S', 'W']
    this.cardinalIndexes = { N: 0, E: 1, S: 2, W: 3 }
    this.validCommands = ['L', 'R', 'M']
    this.plateau = plateau
  }

  getPosition() {
    return `${this.x} ${this.y} ${this.direction}`
  }
  getPlateauPosition() {
    const plateauY = this.plateau[1]

    return `${this.x} ${plateauY - this.y} ${this.direction}`
  }

  getDirection() {
    return this.direction
  }

  changeDirection(command) {
    const { cardinals, cardinalIndexes, direction } = this

    let cardinalIndex = cardinalIndexes[direction]
    let newCardinalIndex
    if (command === 'L') {
      newCardinalIndex =
        cardinalIndex - 1 < 0 ? cardinals.length - 1 : cardinalIndex - 1
    }
    if (command === 'R') {
      newCardinalIndex =
        cardinalIndex + 1 > cardinals.length - 1 ? 0 : cardinalIndex + 1
    }
    this.direction = cardinals[newCardinalIndex]
  }

  getNewPosition() {
    const cardinals = {
      N: (x, y) => [x, y - 1],
      W: (x, y) => [x - 1, y],
      E: (x, y) => [x + 1, y],
      S: (x, y) => [x, y + 1],
    }
    return cardinals[this.direction](this.x, this.y)
  }

  moveOneStep() {
    const { x, y } = this
    const [maxX, maxY] = this.plateau

    let [newX, newY] = this.getNewPosition()
    if (newX > maxX) newX = maxX
    if (newX < 0) newX = x
    if (newY > maxY) newY = maxY
    if (newY < 0) newY = y

    this.x = newX
    this.y = newY
  }

  parseCommand(command) {
    if (command === 'L' || command === 'R') this.changeDirection(command)
    else if (command === 'M') this.moveOneStep()
    else throw new Error('invalid command')
  }

  rove(instruction) {
    for (const command of instruction) {
      this.parseCommand(command)
    }
    return this.getPlateauPosition()
  }
}

module.exports = Rover

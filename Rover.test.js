const Rover = require('./Rover')

describe('Rover.changeDirection', () => {
  const rover = new Rover(1, 2, 'N', [5, 5])

  test('that rover faces East when direction is north and command is R', () => {
    const rover = new Rover(1, 2, 'N', [5, 5])
    rover.changeDirection('R')
    expect(rover.getDirection()).toBe('E')
  })
  test('that rover faces North when direction is west and command is R', () => {
    const rover = new Rover(1, 2, 'W', [5, 5])
    rover.changeDirection('R')
    expect(rover.getDirection()).toBe('N')
  })
  test('that rover faces West when direction is north and command is L', () => {
    const rover = new Rover(1, 2, 'N', [5, 5])
    rover.changeDirection('L')
    expect(rover.getDirection()).toBe('W')
  })
  test('that rover faces South when direction is West and command is L', () => {
    const rover = new Rover(1, 2, 'W', [5, 5])
    rover.changeDirection('L')
    expect(rover.getDirection()).toBe('S')
  })
  test('that when direction changes, position remains same', () => {
    const rover = new Rover(1, 2, 'W', [5, 5])
    rover.changeDirection('L')
    expect(rover.getPlateauPosition()).toBe('1 2 S')
  })
})

describe('getNewPosition', () => {
  test('when direction is North, y is reduced by 1 and x remains the same', () => {
    const rover = new Rover(5, 0, 'N', [5, 5])
    expect(rover.getNewPosition()).toEqual([5, 4])
  })
  test('when direction is East, x is increased by 1 and y remains the same', () => {
    const rover = new Rover(5, 0, 'E', [5, 5])
    expect(rover.getNewPosition()).toEqual([6, 5])
  })
  test('when direction is West, x is reduced by 1 and y remains the same', () => {
    const rover = new Rover(5, 0, 'W', [5, 5])
    expect(rover.getNewPosition()).toEqual([4, 5])
  })
  test('when direction is South, y is increased by 1 and x remains the same', () => {
    const rover = new Rover(5, 0, 'S', [5, 5])
    expect(rover.getNewPosition()).toEqual([5, 6])
  })
})

describe('moveOneStep', () => {
  test('when direction is North, y is reduced by 1 and x remains the same and direction remains the same', () => {
    const rover = new Rover(2, 1, 'N', [5, 5])
    rover.moveOneStep()
    expect(rover.getDirection()).toBe('N')
  })

  test('Test it dose not go beyond the plateau when facing S', () => {
    const rover = new Rover(2, 0, 'S', [5, 5])
    rover.moveOneStep()
    expect(rover.getPosition()).toBe('2 5 S')
  })
  test('Test it dose not go beyond the plateau when facing N', () => {
    const rover = new Rover(2, 5, 'N', [5, 5])
    rover.moveOneStep()
    expect(rover.getPosition()).toBe('2 0 N')
  })
  test('Test it dose not go beyond the plateau when facing E', () => {
    const rover = new Rover(5, 3, 'E', [5, 5])
    rover.moveOneStep()
    expect(rover.getPosition()).toBe('5 2 E')
  })

  test('Test it dose not go beyond the plateau when facing W', () => {
    const rover = new Rover(0, 3, 'W', [5, 5])
    rover.moveOneStep()
    expect(rover.getPosition()).toBe('0 2 W')
  })
})

describe('parseCommand', () => {
  const rover = new Rover(0, 2, 'W', [5, 5])

  const moveOneStep = jest.fn()
  rover.moveOneStep = moveOneStep

  const changeDirection = jest.fn()
  rover.changeDirection = changeDirection

  test('that invalid command is rejected', () => {
    expect(() => {
      rover.parseCommand('D')
    }).toThrow()
    expect(moveOneStep.mock.calls.length).toBe(0)
    expect(changeDirection.mock.calls.length).toBe(0)
  })

  test('that when command is L changeDirection is called', () => {
    rover.parseCommand('L')
    expect(changeDirection.mock.calls.length).toBe(1)
    expect(moveOneStep.mock.calls.length).toBe(0)
  })
  test('that when command is L changeDirection is called', () => {
    rover.parseCommand('R')
    expect(changeDirection.mock.calls.length).toBe(2)
    expect(moveOneStep.mock.calls.length).toBe(0)
  })
  test('that when command is M changeDirection is called', () => {
    rover.parseCommand('M')
    expect(moveOneStep.mock.calls.length).toBe(1)
    expect(changeDirection.mock.calls.length).toBe(2)
  })
})

describe('rove', () => {
  test('that every command entry is parsed and called with appropraite command', () => {
    const rover = new Rover(1, 3, 'N', [5, 5])
    const parseCommand = jest.fn()
    rover.parseCommand = parseCommand
    rover.rove('LMLMLMLMM')
    expect(parseCommand.mock.calls.length).toBe(9)
    expect(parseCommand.mock.calls[1][0]).toBe('M')
  })

  test('rover works', () => {
    const rover = new Rover(1, 2, 'N', [5, 5])
    rover.rove('LMLMLMLMM')
    expect(rover.getPlateauPosition()).toBe('1 3 N')
  })

  test('rover works', () => {
    const rover = new Rover(3, 3, 'E', [5, 5])
    rover.rove('MMRMMRMRRM')
    expect(rover.getPlateauPosition()).toBe('5 1 E')
  })
})

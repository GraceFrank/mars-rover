#!/usr/bin/env node
const program = require('commander')
const { paresFile, parseInput } = require('./inputParser')
program.version('0.0.1')
const Rover = require('./Rover')

program.version('1.0.0').description('Mars rover')

program.parse(process.argv)

program.command('rove <filePath>').action(function (filePath) {
  const input = paresFile(filePath)
  const { plateau, rovers } = parseInput(input)

  for (const rover of rovers) {
    const { x, y, direction, instruction, name } = rover
    const marsRover = new Rover(x, y, direction, plateau)

    console.log(`${name}:${marsRover.rove(instruction)}`)
  }
})

program.parse(process.argv)

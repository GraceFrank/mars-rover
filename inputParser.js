const fs = require('fs')

function paresFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return data
  } catch (err) {
    console.error(err)
  }
}

function parseInput(input) {
  //get each line in the input
  const lineEntries = input.split('\n')

  //get the values for the plateau
  const plateau = lineEntries[0].split(':')[1].split(' ')

  //get all rovers
  const rovers = []
  for (let i = 1; i < lineEntries.length; i += 2) {
    //get the name of the rover and the landing position
    const [name, position] = lineEntries[i].split(':')

    //get values for x,y, and cardinal from postion
    const [x, y, direction] = position.split(' ')

    //get instruction for rover
    const instruction = lineEntries[i + 1].split(':')[1]

    rovers.push({ x, y, direction, instruction, name: name.split(' ')[0] })
  }
  return { plateau, rovers }
}

module.exports = { paresFile, parseInput }

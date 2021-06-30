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
  const lineEntries = input.split('\n')
  console.log(lineEntries)

  const plateau = lineEntries[0].split(':')[1].split(' ')
  const rovers = []

  for (let i = 1; i < lineEntries.length; i += 2) {
    const [name, position] = lineEntries[i].split(':')
    const [x, y, direction] = position.split(' ')
    const instruction = lineEntries[i + 1].split(':')[1]

    rovers.push({ x, y, direction, instruction, name: name.split(' ')[0] })
  }
  return { plateau, rovers }
}

module.exports = { paresFile, parseInput }

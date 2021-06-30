const fs = require('fs')

function paresFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return data
  } catch (err) {
    console.error(err)
  }
}

module.exports = { paresFile, parseInput }

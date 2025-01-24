const path = require('path')
const fs = require('fs')

const imageDir = path.join(
  app.getAppPath('C:\Users\victo\OneDrive\Escritorio\fotografias'),
  'fotografias'
)

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true })
}

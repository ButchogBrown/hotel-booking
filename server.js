const app = require('./appSetup')
const { port } = require('./includes/config/mainConfig.js')

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
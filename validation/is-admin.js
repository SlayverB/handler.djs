const { Validation } = require('../src/index.js');

module.exports = new Validation()
.setCommnads(["ping"])
.setExecution( (message, next) => {
  message.data.set("name", "hello")
  if (message.data) next()
})
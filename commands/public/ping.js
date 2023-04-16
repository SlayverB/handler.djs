const Command = require('../../src/index').Command;

module.exports = new Command() 
.setName("ping")
.setDescription("Test Bot ws Ping")
.setExample(["ping"])
.setUsage(["ping (bot)", "ping (user)"])
.setCooldown("10s")
.setPermissions(["SendMessages"])
.setExecution(run)
.setCategory("Fun")

async function run() {
  const { message, client, args } = this;
  
  console.log(message.data.get("name"))
  message.reply({content: "done"});
}